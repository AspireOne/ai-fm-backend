import * as fs from "node:fs";
import { access } from "node:fs/promises";
import ytdl from "@distube/ytdl-core";
import { BulkDownloadOptions, BulkDownloadResult, DownloadTask } from "./yt.types";

/**
 * Downloads audio from a YouTube URL and saves it as an MP3 file
 * @param youtubeUrl The YouTube URL to download from
 * @param outputPath The full path where the MP3 file should be saved
 * @returns A promise that resolves to the output path when download is complete
 */
async function downloadYoutubeAudio(
  youtubeUrl: string,
  outputPath: string,
): Promise<string> {
  // Check if file already exists
  try {
    await access(outputPath);
    console.log(`File ${outputPath} already exists, not downloading yt video.`);
    return outputPath;
  } catch (error) {
    // File doesn't exist, proceed with download
    console.log(`Downloading audio from YouTube (${youtubeUrl}) to ${outputPath}...`);

    return new Promise<string>((resolve, reject) => {
      const writeStream = fs.createWriteStream(outputPath);

      ytdl(youtubeUrl, {
        filter: "audioonly",
        quality: "highestaudio", // TODO: add highestaudio
      })
        .pipe(writeStream)
        .on("finish", () => {
          console.log(`Download complete: ${outputPath}`);
          resolve(outputPath);
        })
        .on("error", (err: Error) => {
          console.error(`Error downloading audio:`, err);
          reject(err);
        });
    });
  }
}

/**
 * Downloads multiple YouTube audio files concurrently with configurable thread limits
 * @param tasks Array of download tasks (YouTube URL and output path pairs)
 * @param options Configuration options for the bulk download
 * @returns Promise resolving to the bulk download results
 */
async function downloadBulkYoutubeAudio(
  tasks: DownloadTask[],
  options: BulkDownloadOptions = {},
): Promise<BulkDownloadResult> {
  const { maxConcurrent = 3, continueOnError = true, onProgress } = options;

  const startTime = Date.now();
  const result: BulkDownloadResult = {
    successful: [],
    failed: [],
    timeTakenMs: 0,
  };

  // Create a queue of tasks
  const queue = [...tasks];
  const inProgress = new Set<Promise<void>>();
  let completed = 0;
  const total = tasks.length;

  // Process the queue until it's empty
  while (queue.length > 0 || inProgress.size > 0) {
    // Fill up to maxConcurrent downloads
    while (queue.length > 0 && inProgress.size < maxConcurrent) {
      const task = queue.shift()!;

      // Create the promise
      const processTask = async () => {
        try {
          onProgress?.(completed, total, task);
          const outputPath = await downloadYoutubeAudio(task.youtubeUrl, task.outputPath);
          result.successful.push(outputPath);
        } catch (error) {
          result.failed.push({ task, error: error as Error });
          if (!continueOnError) {
            // Clear the queue to stop processing
            queue.length = 0;
            throw error;
          }
        } finally {
          completed++;
          onProgress?.(completed, total);
        }
      };

      // Create the promise and store a reference to it
      const downloadPromise = processTask().finally(() => {
        inProgress.delete(downloadPromise);
      });
      inProgress.add(downloadPromise);
    }

    // Wait for at least one task to complete before continuing
    if (inProgress.size > 0) {
      await Promise.race(inProgress);
    }
  }

  result.timeTakenMs = Date.now() - startTime;
  return result;
}

// TODO: Make sure it indeed workss.
async function fetchTitles(
  songs: { url: string }[],
  props: { maxConcurrent: number; placeholderTitle: string } = {
    maxConcurrent: 5,
    placeholderTitle: "Unknown title",
  },
): Promise<{ url: string; title: string }[]> {
  const results: { url: string; title: string }[] = [];

  // Create a queue of songs
  const queue = [...songs];
  const inProgress = new Set<Promise<void>>();

  // Process the queue until it's empty
  while (queue.length > 0 || inProgress.size > 0) {
    // Fill up to maxConcurrent requests
    while (queue.length > 0 && inProgress.size < props.maxConcurrent) {
      const song = queue.shift()!;

      // Create the promise
      const processTask = async () => {
        try {
          const info = await ytdl.getBasicInfo(song.url);
          results.push({
            url: song.url,
            title: info.videoDetails.title,
          });
        } catch (error) {
          console.error(`Error fetching title for ${song.url}:`, error);
          // Add with a placeholder title if there's an error
          results.push({
            url: song.url,
            title: props.placeholderTitle,
          });
        }
      };

      // Create the promise and store a reference to it
      const fetchPromise = processTask().finally(() => {
        inProgress.delete(fetchPromise);
      });
      inProgress.add(fetchPromise);
    }

    // Wait for at least one task to complete before continuing
    if (inProgress.size > 0) {
      await Promise.race(inProgress);
    }
  }

  return results;
}

export default {
  downloadYoutubeAudio,
  downloadBulkYoutubeAudio,
  fetchTitles,
};
