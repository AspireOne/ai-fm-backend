import { CreateRadioInputSchema } from "./schemas/create-radio-input.schema";
import { db } from "../../providers/db";
import { Block, ParsedRadio, RadiosResponse } from "./radio.types";
import { uuid } from "../../helpers/uuid";
import ytService from "../yt/yt.service";
import { moderators } from "../voiceover/voiceover-moderators";
import fs from "fs";
import path from "path";
import os from "os";
import { spawn } from "child_process";
import audioManagerService from "../audio-file-manager/audio-file-manager.service";
import { Paths } from "../../helpers/paths";
// These imports are dynamically required in the downloadAndForwardSongs function
// import FormData from 'form-data';
// import axios from 'axios';

/**
 * @throws Error if the radio is not found
 * @param radioId
 */
async function getRadioOrThrow(radioId: string): Promise<ParsedRadio> {
  const radio = await db
    .selectFrom("radios")
    .where("id", "=", radioId)
    .select(["blocks", "title", "description", "id", "voice_id", "voice_description"])
    .executeTakeFirst();

  if (!radio) {
    throw new Error(`Radio with ID ${radioId} not found`);
  }

  const blocks: Block[] = radio.blocks as object as Block[];

  const isVoiceIdValid = moderators.list.some((mod) => mod.id === radio.voice_id);
  if (radio.voice_id && !isVoiceIdValid) {
    console.error(`Invalid voice ID: ${radio.voice_id} unsetting it from the radio`);
    db.updateTable("radios")
      .set("voice_id", null)
      .where("id", "=", radioId)
      .execute()
      .catch((e) => console.error("Could not unset voice id", e));
  }

  return {
    ...radio,
    voice_id: radio.voice_id ?? moderators.default.id,
    voice_description: radio.voice_description ?? moderators.default.personality,
    blocks,
  };
}

async function getRadios(): Promise<RadiosResponse> {
  const radios = await db
    .selectFrom("radios")
    .select(["id", "title", "description", "is_public", "blocks", "created_at"])
    .execute();

  return radios.map((radio) => ({
    ...radio,
    blockCount: (radio.blocks as Block[])?.length,
    songCount: (radio.blocks as Block[])?.filter((b) => b.type === "song").length,
    createdAt:
      typeof radio.created_at === "string"
        ? radio.created_at
        : radio.created_at.toISOString(),
    blocks: undefined,
  }));
}

/**
 * Cleans a YouTube URL to keep only the video ID parameter
 * @param url The original YouTube URL
 * @returns A cleaned URL with only the video ID
 */
function cleanYoutubeUrl(url: string): string {
  try {
    // Handle HTML-encoded ampersands
    url = url.replace(/&amp;/g, '&');
    
    // Parse the URL
    const parsedUrl = new URL(url);
    
    // Extract the video ID parameter
    const videoId = parsedUrl.searchParams.get('v');
    if (!videoId) {
      return url; // No video ID found, return unchanged
    }
    
    // Preserve the original protocol, hostname and path
    // but only keep the 'v' query parameter
    const cleanUrl = new URL(url);
    
    // Clear all search parameters
    cleanUrl.search = '';
    
    // Add back only the video ID parameter
    cleanUrl.searchParams.set('v', videoId);
    
    return cleanUrl.toString();
  } catch (error) {
    console.error(`Error cleaning YouTube URL: ${error}`);
    return url; // Return original URL if parsing fails
  }
}

async function createRadio(props: CreateRadioInputSchema) {
  // Skip title fetching as YT blocked yt-dlp, set all titles to null
  const songsWithNullTitles = props.songs.map(song => ({
    url: cleanYoutubeUrl(song.url),
    title: null
  }));
  
  const feed = createFeed(songsWithNullTitles);

  let voiceId = props.voice_id;
  const voiceDescription =
    props.voice_description && props.voice_description.trim().length > 5
      ? props.voice_description
      : undefined;

  if (props.voice_id) {
    const isVoiceIdValid = moderators.list.some((mod) => mod.id === props.voice_id);
    if (!isVoiceIdValid) {
      console.error(`Invalid voice ID: ${props.voice_id}`);
      voiceId = undefined;
    }
  }

  return await db
    .insertInto("radios")
    .values({
      title: props.title,
      is_public: props.is_public,
      description: props.description,
      voice_id: voiceId,
      voice_description: voiceDescription,
      blocks: JSON.stringify(feed),
    })
    .returningAll()
    .execute();
}

/**
 * The goal is to create a complete radio feed. Meaning that in between each song (almost always), there should be an
 * input (moderator voiceover), and sometimes (not always) there should also be a "sweeper" right after a song,
 * regardless of whether it is immediately followed by an input or directly a song.
 * @param songs
 */
function createFeed(songs: { url: string; title: string | null }[]): Block[] {
  const feed: Block[] = [];

  // Configuration for randomization
  const inputProbability = 0.9; // 90% chance of having an input after a song
  const sweeperProbability = 0.3; // 30% chance of having a sweeper after a song

  feed.push({
    type: "sweeper",
    id: `sweeper-${uuid()}`,
  });

  // Process each song
  songs.forEach((song, index) => {
    // Add the song to the feed
    feed.push({
      type: "song",
      id: `song-${uuid()}`,
      yt: {
        url: song.url,
        title: song.title,
      },
    });

    // Determine if we should add a sweeper after this song
    const addSweeper = Math.random() < sweeperProbability;
    if (addSweeper) {
      feed.push({
        type: `sweeper`,
        id: `sweeper-${uuid()}`,
      });
    }

    // Determine if we should add an input after this song (or after the sweeper if present)
    // Always add an input after the last song
    const addInput = index === songs.length - 1 || Math.random() < inputProbability;
    if (addInput) {
      feed.push({
        type: "voiceover",
        id: `voiceover-${uuid()}`,
      });
    }
  });

  return feed;
}

/**
 * Preloads all songs in a radio using yt-dlp's batch download feature
 * @param radioId The ID of the radio
 * @returns A promise that resolves when all songs are preloaded
 */
async function preloadAllSongs(radioId: string): Promise<{
  totalSongs: number;
  successful: number;
  failed: number;
}> {
  // Get the radio
  const radio = await getRadioOrThrow(radioId);
  
  // Filter out only song blocks
  const songBlocks = radio.blocks.filter(block => block.type === "song");
  
  if (songBlocks.length === 0) {
    return { totalSongs: 0, successful: 0, failed: 0 };
  }
  
  console.log(`[Radio ${radioId}] Starting preload of ${songBlocks.length} songs`);
  
  // Create a mapping of YouTube URLs to block IDs for tracking
  const urlToBlockMap = new Map<string, { blockId: string, index: number }>();
  
  // Create a temporary file with all YouTube URLs to download
  const tempDir = path.join(Paths.projectRoot, 'radio-preload');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }
  
  const urlListPath = path.join(tempDir, `${radioId}-urls.txt`);
  
  // Write URLs to file
  const urlsToDownload: string[] = [];
  for (const block of songBlocks) {
    if (block.yt?.url) {
      const blockId = block.id;
      const blockIndex = radio.blocks.findIndex(b => b.id === blockId);
      const outputPath = audioManagerService.getBlockAudioPath(blockId, "song");
      
      // Skip if file already exists and has content
      if (fs.existsSync(outputPath) && fs.statSync(outputPath).size > 0) {
        console.log(`[Radio ${radioId}] Song ${blockId} already downloaded, skipping`);
        continue;
      }
      
      urlsToDownload.push(block.yt.url);
      urlToBlockMap.set(block.yt.url, { blockId, index: blockIndex });
    }
  }
  
  // If all files already exist, return early
  if (urlsToDownload.length === 0) {
    return { 
      totalSongs: songBlocks.length, 
      successful: songBlocks.length, 
      failed: 0 
    };
  }
  
  // Write URLs to file
  fs.writeFileSync(urlListPath, urlsToDownload.join('\n'));
  
  // Set up counters
  let successful = songBlocks.length - urlsToDownload.length; // Already downloaded files
  let failed = 0;
  
  return new Promise((resolve) => {
    // Create a temp directory for downloads
    const tempDownloadDir = path.join(tempDir, `${radioId}-downloads`);
    if (!fs.existsSync(tempDownloadDir)) {
      fs.mkdirSync(tempDownloadDir, { recursive: true });
    }
    
    // Prepare yt-dlp command
    // -a: batch file with URLs
    // -f: format (best audio)
    // -x: extract audio
    // --audio-format mp3: convert to mp3
    // -o: output template with path
    const ytDlpArgs = [
      '-a', urlListPath,
      '-f', 'bestaudio',
      '-x', 
      '--audio-format', 'mp3',
      '-o', `${tempDownloadDir}/%(id)s.%(ext)s`,
      '--restrict-filenames'
    ];
    
    console.log(`[Radio ${radioId}] Running yt-dlp with batch download`);
    console.log(`[Radio ${radioId}] Command: yt-dlp ${ytDlpArgs.join(' ')}`);
    console.log(`[Radio ${radioId}] URL list path: ${urlListPath}`);
    console.log(`[Radio ${radioId}] Temp download dir: ${tempDownloadDir}`);
    
    // Execute yt-dlp
    const ytDlpProcess = spawn('yt-dlp', ytDlpArgs);
    
    // Store stdout for logging
    let stdoutData = '';
    
    ytDlpProcess.stdout.on('data', (data) => {
      const output = data.toString();
      stdoutData += output;
      console.log(`[Radio ${radioId}] yt-dlp output: ${output.trim()}`);
    });
    
    ytDlpProcess.stderr.on('data', (data) => {
      console.error(`[Radio ${radioId}] yt-dlp error: ${data.toString()}`);
    });
    
    ytDlpProcess.on('close', async (code) => {
      console.log(`[Radio ${radioId}] yt-dlp process exited with code ${code}`);
      
      // After download completes, get all the MP3 files in the temp directory
      const downloadedFiles = fs.readdirSync(tempDownloadDir)
        .filter(file => file.endsWith('.mp3'))
        .map(file => path.join(tempDownloadDir, file));
      
      console.log(`[Radio ${radioId}] Found ${downloadedFiles.length} downloaded files`);
      
      // Extract YouTube IDs from filenames (assuming format is "YTID.mp3")
      const downloadedYoutubeIds = downloadedFiles.map(filepath => {
        const filename = path.basename(filepath, '.mp3');
        return filename;
      });
      
      // Collect mapping data for the downloaded files
      let videoIdsToBlockIds = new Map<string, string>();
      
      // Match downloaded files to blocks by checking video IDs in YouTube URLs
      for (const [url, { blockId }] of urlToBlockMap.entries()) {
        // Extract video ID from URL - handling multiple YouTube URL formats
        let videoId: string | null = null;
        
        // Handle youtube.com URLs with v parameter
        if (url.includes('youtube.com') && url.includes('v=')) {
          const match = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
          if (match && match[1]) videoId = match[1];
        } 
        // Handle youtu.be short URLs
        else if (url.includes('youtu.be')) {
          const match = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
          if (match && match[1]) videoId = match[1];
        }
        // Handle other formats with a more general regex as fallback
        else {
          const match = url.match(/(?:v=|\/|^)([a-zA-Z0-9_-]{11})(?:&|\/|$)/);
          if (match && match[1]) videoId = match[1];
        }
        
        if (videoId) {
          console.log(`[Radio ${radioId}] Mapped URL ${url} to video ID ${videoId} for block ${blockId}`);
          videoIdsToBlockIds.set(videoId, blockId);
        } else {
          console.error(`[Radio ${radioId}] Could not extract video ID from URL: ${url}`);
        }
      }
      
      // Process downloaded files based on video ID matching
      for (const filepath of downloadedFiles) {
        const filename = path.basename(filepath, '.mp3');
        const blockId = videoIdsToBlockIds.get(filename);
        
        if (!blockId) {
          console.error(`[Radio ${radioId}] Could not match file ${filename} to any block`);
          continue;
        }
        
        const targetPath = audioManagerService.getBlockAudioPath(blockId, "song");
        
        // Create target directory if it doesn't exist
        const targetDir = path.dirname(targetPath);
        if (!fs.existsSync(targetDir)) {
          fs.mkdirSync(targetDir, { recursive: true });
        }
        
        try {
          // Copy file to target location
          fs.copyFileSync(filepath, targetPath);
          console.log(`[Radio ${radioId}] Successfully copied file to ${targetPath}`);
          successful++;
        } catch (error) {
          console.error(`[Radio ${radioId}] Failed to copy file to ${targetPath}:`, error);
          failed++;
        }
      }
      
      // Reset success/failure counters for more accurate counting
      successful = songBlocks.length - urlsToDownload.length; // Start with previously downloaded files
      failed = 0;
      
      // Track which blocks were successfully processed
      const successfulBlockIds = new Set<string>();
      
      // Count blocks that weren't processed as failures
      for (const [url, { blockId }] of urlToBlockMap.entries()) {
        const targetPath = audioManagerService.getBlockAudioPath(blockId, "song");
        
        if (fs.existsSync(targetPath) && fs.statSync(targetPath).size > 0) {
          // This block was processed successfully
          if (!successfulBlockIds.has(blockId)) {
            successfulBlockIds.add(blockId);
            successful++;
          }
        } else {
          // This block either wasn't processed or failed
          console.error(`[Radio ${radioId}] Block ${blockId} was not successfully downloaded`);
          failed++;
        }
      }
      
      const skipCleanup = false; // Clean up temporary files after download
      
      if (skipCleanup) {
        console.log(`[Radio ${radioId}] Skipping cleanup. URL list at: ${urlListPath}`);
        console.log(`[Radio ${radioId}] Downloaded files in: ${tempDownloadDir}`);
      } else {
        console.log(`[Radio ${radioId}] Cleaning up temporary files`);
        try {
          fs.unlinkSync(urlListPath);
          fs.rmSync(tempDownloadDir, { recursive: true, force: true });
        } catch (error) {
          console.error(`[Radio ${radioId}] Error cleaning up temp files:`, error);
        }
      }
      
      console.log(`[Radio ${radioId}] Preload complete. Success: ${successful}, Failed: ${failed}`);
      resolve({
        totalSongs: songBlocks.length,
        successful, 
        failed
      });
    });
  });
}

/**
 * Uploads song files and saves them with the correct block ID
 * @param props Object containing the songs to upload
 * @returns Result of the upload operation
 */
async function uploadSongs(props: { songs: Array<{ blockId: string, radioId: string, fileBuffer: Buffer, filename: string, title?: string | null }> }): Promise<{
  totalSongs: number;
  successful: number;
  failed: {
    blockId: string;
    error: string;
  }[];
}> {
  const results = {
    totalSongs: props.songs.length,
    successful: 0,
    failed: [] as { blockId: string; error: string }[]
  };

  // Process each song
  for (const song of props.songs) {
    const { blockId, radioId, fileBuffer, filename, title } = song;
    
    try {
      // Verify the radio exists and the block belongs to it
      const radio = await getRadioOrThrow(radioId);
      const block = radio.blocks.find(b => b.id === blockId);
      
      if (!block) {
        results.failed.push({
          blockId,
          error: `Block with ID ${blockId} not found in radio ${radioId}`
        });
        continue;
      }
      
      if (block.type !== "song") {
        results.failed.push({
          blockId,
          error: `Block with ID ${blockId} is not a song block`
        });
        continue;
      }
      
      // Get the target path for the audio file
      const targetPath = audioManagerService.getBlockAudioPath(blockId, "song");
      
      // Create directory if it doesn't exist
      const targetDir = path.dirname(targetPath);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      
      // Write the file
      fs.writeFileSync(targetPath, fileBuffer);
      console.log(`[Radio ${radioId}] Saved uploaded song for block ${blockId} to ${targetPath}`);
      
      // Update the block with the title if provided
      if (title) {
        // Get the radio's blocks
        const blocks = [...radio.blocks];
        const blockIndex = blocks.findIndex(b => b.id === blockId);
        
        if (blockIndex !== -1 && blocks[blockIndex].type === "song") {
          // Clone the block to modify
          const updatedBlock = {
            ...blocks[blockIndex],
            yt: {
              ...blocks[blockIndex].yt,
              url: blocks[blockIndex].yt?.url || "", // Ensure URL is not undefined
              title
            }
          };
          
          // Update blocks array
          blocks[blockIndex] = updatedBlock;
          
          // Save the updated blocks back to the database
          await db.updateTable("radios")
            .set({ blocks: JSON.stringify(blocks) })
            .where("id", "=", radioId)
            .execute();
          
          console.log(`[Radio ${radioId}] Updated block ${blockId} with title: "${title}"`);
        }
      }
      
      results.successful++;
    } catch (error) {
      console.error(`[Radio ${radioId}] Error saving song for block ${blockId}:`, error);
      results.failed.push({
        blockId,
        error: error instanceof Error ? error.message : "Unknown error occurred"
      });
    }
  }
  
  return results;
}

/**
 * Downloads all songs from a radio and uploads them to another server
 * @param radioId The radio ID
 * @param serverUrl The target server URL
 * @returns Statistics about the operation
 */
async function downloadAndForwardSongs(radioId: string, serverUrl: string): Promise<{
  totalSongs: number;
  downloaded: number;
  uploaded: number;
  failed: {
    blockId: string;
    error: string;
  }[];
}> {
  const results = {
    totalSongs: 0,
    downloaded: 0,
    uploaded: 0,
    failed: [] as { blockId: string; error: string }[]
  };

  try {
    // Step 1: Get the radio
    const radio = await getRadioOrThrow(radioId);
    
    // Step 2: Filter out song blocks
    const songBlocks = radio.blocks.filter(block => block.type === "song");
    results.totalSongs = songBlocks.length;
    
    if (songBlocks.length === 0) {
      return results;
    }
    
    console.log(`[Radio ${radioId}] Starting download and forward of ${songBlocks.length} songs to ${serverUrl}`);
    
    // Step 3: Download all songs
    const downloadResult = await preloadAllSongs(radioId);
    results.downloaded = downloadResult.successful;
    
    // Step 4: Upload each successfully downloaded song to the target server
    for (const block of songBlocks) {
      const blockId = block.id;
      const audioPath = audioManagerService.getBlockAudioPath(blockId, "song");
      
      // Check if the file exists
      if (!fs.existsSync(audioPath) || fs.statSync(audioPath).size === 0) {
        results.failed.push({
          blockId,
          error: "Song file not found or empty after download"
        });
        continue;
      }
      
      try {
        // Create a form data object for the upload
        const FormData = require('form-data');
        const axios = require('axios');
        const form = new FormData();
        
        // Add the required fields
        form.append('blockId', blockId);
        form.append('radioId', radioId);
        form.append('file', fs.createReadStream(audioPath), {
          filename: path.basename(audioPath),
          contentType: 'audio/mpeg'
        });
        
        // Upload to the target server
        console.log(`[Radio ${radioId}] Uploading song ${blockId} to ${serverUrl}/radios/upload-songs`);
        const response = await axios.post(`${serverUrl}/radios/upload-songs`, form, {
          headers: form.getHeaders(),
          maxContentLength: Infinity,
          maxBodyLength: Infinity
        });
        
        if (response.status >= 200 && response.status < 300) {
          console.log(`[Radio ${radioId}] Successfully uploaded song ${blockId}`);
          results.uploaded++;
        } else {
          console.error(`[Radio ${radioId}] Failed to upload song ${blockId}: ${response.statusText}`);
          results.failed.push({
            blockId,
            error: `Upload failed with status ${response.status}: ${response.statusText}`
          });
        }
      } catch (error) {
        console.error(`[Radio ${radioId}] Error uploading song ${blockId}:`, error);
        results.failed.push({
          blockId,
          error: error instanceof Error ? error.message : "Unknown error during upload"
        });
      }
    }
    
    return results;
  } catch (error) {
    console.error(`[Radio ${radioId}] Error in download and forward:`, error);
    throw error;
  }
}

export default {
  createRadio,
  getRadios,
  getRadioOrThrow,
  preloadAllSongs,
  uploadSongs,
  downloadAndForwardSongs,
};
