import ytdl from "@distube/ytdl-core";
import { spawn } from "child_process";
import { exec } from "child_process";
import { promisify } from "util";
import { Paths } from "../../helpers/paths";

const execPromise = promisify(exec);

/**
 * Downloads audio from a YouTube URL and saves it as an MP3 file
 * @param youtubeUrl The YouTube URL to download from
 * @param outputPath The full path where the MP3 file should be saved
 * @returns A promise that resolves to the output path when download is complete
 */
async function downloadYoutubeAudio(
  youtubeUrl: string,
  outputPath: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    // Command arguments for yt-dlp
    const args = [
      youtubeUrl,
      "-x", // Extract audio
      "--audio-format",
      "mp3",
      "--audio-quality",
      "0", // Best quality
      "-o",
      outputPath,
      // Add other options as needed
    ];
    if (Paths.ytCookies) {
      args.push("--cookies");
      args.push(Paths.ytCookies);
    }

    console.log(
      `Running yt-dlp with URL: ${youtubeUrl} (with cookies?: ${!!Paths.ytCookies})`,
    );

    // Spawn the yt-dlp process
    const process = spawn("yt-dlp", args);

    let stderr = "";

    // Capture stdout (if you want to see progress)
    process.stdout.on("data", (data) => {
      console.log(`yt-dlp: ${data.toString().trim()}`);
    });

    // Capture stderr for error handling
    process.stderr.on("data", (data) => {
      stderr += data.toString();
      console.error(`yt-dlp error: ${data.toString().trim()}`);
    });

    // Handle process completion
    process.on("close", (code) => {
      if (code === 0) {
        console.log(`Downloaded successfully: ${outputPath}`);
        resolve();
      } else {
        reject(new Error(`yt-dlp failed with code ${code}: ${stderr}`));
      }
    });

    // Handle process spawn errors
    process.on("error", (err) => {
      reject(new Error(`Failed to start yt-dlp: ${err.message}`));
    });
  });
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
            // TODO: Move to yt-dlp from system (like in downloadYoutubeAudio).
            //  This works for now.
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

/**
 * Checks if yt-dlp is available on the system
 * @returns A promise that resolves if yt-dlp is available, rejects with an error otherwise
 */
async function checkYtDlpAvailability(): Promise<void> {
  return new Promise((resolve, reject) => {
    // Try to run yt-dlp --version
    const process = spawn("yt-dlp", ["--version"]);

    let stderr = "";

    process.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    process.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`yt-dlp is not available on the system. Error: ${stderr}`));
      }
    });

    process.on("error", (err) => {
      reject(
        new Error(
          `Failed to start yt-dlp: ${err.message}. Make sure yt-dlp is installed and in the PATH.`,
        ),
      );
    });
  });
}

/**
 * Checks if FFmpeg is available on the system
 * @returns A promise that resolves if FFmpeg is available, rejects with an error otherwise
 */
async function checkFfmpegAvailability(): Promise<void> {
  return new Promise((resolve, reject) => {
    // Try to run ffmpeg -version
    const process = spawn("ffmpeg", ["-version"]);

    let stderr = "";

    process.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    process.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`FFmpeg is not available on the system. Error: ${stderr}`));
      }
    });

    process.on("error", (err) => {
      reject(
        new Error(
          `Failed to start FFmpeg: ${err.message}. Make sure FFmpeg is installed and in the PATH.`,
        ),
      );
    });
  });
}

export default {
  downloadYoutubeAudio,
  fetchTitles,
  checkYtDlpAvailability,
  checkFfmpegAvailability,
};
