import { CreateRadioInputSchema } from "./schemas/create-radio-input.schema";
import { db } from "../../providers/db";
import { Block, ParsedRadio, RadiosResponse } from "./radio.types";
import { uuid } from "../../helpers/uuid";
import { moderators } from "../voiceover/voiceover-moderators";
import fs from "fs";
import path from "path";
import audioManagerService from "../audio-file-manager/audio-file-manager.service";

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
    url = url.replace(/&amp;/g, "&");

    // Parse the URL
    const parsedUrl = new URL(url);

    // Extract the video ID parameter
    const videoId = parsedUrl.searchParams.get("v");
    if (!videoId) {
      return url; // No video ID found, return unchanged
    }

    // Preserve the original protocol, hostname and path
    // but only keep the 'v' query parameter
    const cleanUrl = new URL(url);

    // Clear all search parameters
    cleanUrl.search = "";

    // Add back only the video ID parameter
    cleanUrl.searchParams.set("v", videoId);

    return cleanUrl.toString();
  } catch (error) {
    console.error(`Error cleaning YouTube URL: ${error}`);
    return url; // Return original URL if parsing fails
  }
}

async function createRadio(props: CreateRadioInputSchema) {
  // Skip title fetching as YT blocked yt-dlp, set all titles to null
  const songsWithNullTitles = props.songs.map((song) => ({
    url: cleanYoutubeUrl(song.url),
    title: null,
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
  const songBlocks = radio.blocks.filter((block) => block.type === "song");

  if (songBlocks.length === 0) {
    return { totalSongs: 0, successful: 0, failed: 0 };
  }

  console.log(
    `[Radio ${radioId}] Preload songs functionality disabled - YouTube blocks server downloads`,
  );
  console.log(
    `[Radio ${radioId}] Songs must be uploaded by users through the upload endpoint`,
  );

  return {
    totalSongs: songBlocks.length,
    successful: 0,
    failed: songBlocks.length,
  };
}

/**
 * Uploads song files and saves them with the correct block ID
 * @param props Object containing the songs to upload
 * @returns Result of the upload operation
 */
async function uploadSongs(props: {
  songs: Array<{
    blockId: string;
    radioId: string;
    fileBuffer: Buffer;
    filename: string;
    title?: string | null;
  }>;
}): Promise<{
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
    failed: [] as { blockId: string; error: string }[],
  };

  // Process each song
  for (const song of props.songs) {
    const { blockId, radioId, fileBuffer, filename, title } = song;

    try {
      // Verify the radio exists and the block belongs to it
      const radio = await getRadioOrThrow(radioId);
      const block = radio.blocks.find((b) => b.id === blockId);

      if (!block) {
        results.failed.push({
          blockId,
          error: `Block with ID ${blockId} not found in radio ${radioId}`,
        });
        continue;
      }

      if (block.type !== "song") {
        results.failed.push({
          blockId,
          error: `Block with ID ${blockId} is not a song block`,
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
      console.log(
        `[Radio ${radioId}] Saved uploaded song for block ${blockId} to ${targetPath}`,
      );

      // Update the block with the title if provided
      if (title) {
        // Get the radio's blocks
        const blocks = [...radio.blocks];
        const blockIndex = blocks.findIndex((b) => b.id === blockId);

        if (blockIndex !== -1 && blocks[blockIndex].type === "song") {
          // Clone the block to modify
          const updatedBlock = {
            ...blocks[blockIndex],
            yt: {
              ...blocks[blockIndex].yt,
              url: blocks[blockIndex].yt?.url || "", // Ensure URL is not undefined
              title,
            },
          };

          // Update blocks array
          blocks[blockIndex] = updatedBlock;

          // Save the updated blocks back to the database
          await db
            .updateTable("radios")
            .set({ blocks: JSON.stringify(blocks) })
            .where("id", "=", radioId)
            .execute();

          console.log(
            `[Radio ${radioId}] Updated block ${blockId} with title: "${title}"`,
          );
        }
      }

      results.successful++;
    } catch (error) {
      console.error(`[Radio ${radioId}] Error saving song for block ${blockId}:`, error);
      results.failed.push({
        blockId,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  }

  return results;
}

export default {
  createRadio,
  getRadios,
  getRadioOrThrow,
  preloadAllSongs,
  uploadSongs,
};
