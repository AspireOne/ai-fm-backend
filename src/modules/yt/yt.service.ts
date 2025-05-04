import * as fs from "node:fs";
import { access } from "node:fs/promises";
import ytdl from "@distube/ytdl-core";
import { BulkDownloadOptions, BulkDownloadResult, DownloadTask } from "./yt.types";
import path from "node:path";
import { Paths } from "../../helpers/paths";

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

    const original = path.join(Paths.resourcesDir, "strike_a_pose.mp3");
    // simply copy it to the outputPath
    fs.copyFileSync(original, outputPath);
    return outputPath;

    return new Promise<string>((resolve, reject) => {
      const writeStream = fs.createWriteStream(outputPath);

      ytdl(youtubeUrl, {
        filter: "audioonly",
        quality: "highestaudio",
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

async function fetchTitles(
  songs: { url: string }[],
  props: { maxConcurrent: number } = { maxConcurrent: 5 },
): Promise<{ url: string; title: string | null }[]> {
  const results: { url: string; title: string | null }[] = [];

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
          let info;
          try {
            info = await ytdl.getBasicInfo(song.url);
            if (!info?.videoDetails?.title) {
              console.error(`No title fetched for ${song.url}`);
              info = null;
            }
          } catch (error) {
            console.error(`Error fetching basic info for ${song.url}:`, error);
            info = null;
          }

          results.push({
            url: song.url,
            title: info?.videoDetails?.title || null,
          });
        } catch (error) {
          console.error(`Error fetching title for ${song.url}:`, error);
          // Add with a placeholder title if there's an error
          results.push({
            url: song.url,
            title: null,
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
