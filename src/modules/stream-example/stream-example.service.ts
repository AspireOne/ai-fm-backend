import { createReadStream } from "fs";
import { promisify } from "util";
import * as fs from "node:fs";
import { Paths } from "../../helpers/paths";
import ytService from "../yt/yt.service";

const AUDIO_DIR = Paths.downloadedFilesDir;
const statAsync = promisify(fs.stat);

/**
 * Ensures the audio directory exists
 */
async function ensureAudioDirectory(): Promise<void> {
  try {
    fs.mkdirSync(AUDIO_DIR, { recursive: true });
  } catch (error) {
    // Directory already exists or cannot be created
    console.error("Error creating directory:", error);
  }
}

/**
 * Prepares a song for streaming by downloading it if needed
 * @param youtubeUrl YouTube URL to download from
 * @param filename Filename to save as
 * @returns Path to the downloaded file
 */
async function prepareSongForStreaming(
  youtubeUrl: string,
  filename: string,
): Promise<string> {
  const songPath = `${AUDIO_DIR}/${filename}.mp3`;
  return await ytService.downloadYoutubeAudio(youtubeUrl, songPath);
}

/**
 * Creates a stream-example for a specific range of a file
 * @param filePath Path to the file
 * @param range Range header from request (optional)
 * @returns Stream information including status code and headers
 */
async function createAudioStream(filePath: string, range?: string) {
  const fileStats = await statAsync(filePath);

  const headers: Record<string, string | number> = {
    "Content-Type": "audio/mpeg",
    "Content-Length": fileStats.size,
    "Accept-Ranges": "bytes",
  };

  let statusCode = 200;
  let stream;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileStats.size - 1;

    const chunkSize = end - start + 1;

    headers["Content-Range"] = `bytes ${start}-${end}/${fileStats.size}`;
    headers["Content-Length"] = chunkSize;
    statusCode = 206; // Partial Content

    stream = createReadStream(filePath, { start, end });
  } else {
    stream = createReadStream(filePath);
  }

  return {
    stream,
    headers,
    statusCode,
  };
}

export default {
  ensureAudioDirectory,
  prepareSongForStreaming,
  createAudioStream,
};
