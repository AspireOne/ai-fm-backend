import { createReadStream } from "fs";
import { promisify } from "util";
import { FastifyInstance } from "fastify";
import * as fs from "node:fs";
import { Paths } from "../../helpers/paths";
import { downloadYoutubeAudio } from "../youtube-downloader/youtube-downloader.service";

const AUDIO_DIR = Paths.downloadedFilesDir;
const statAsync = promisify(fs.stat);

export function registerStreamController(fastify: FastifyInstance) {
  // Ensure the directory exists
  try {
    fs.mkdirSync(AUDIO_DIR, { recursive: true });
  } catch (error) {
    // Directory already exists or cannot be created
    console.error("Error creating directory:", error);
  }

  fastify.get("/stream", async (request, reply) => {
    try {
      const songDir = AUDIO_DIR + "/HUH.mp3";
      await downloadYoutubeAudio("https://www.youtube.com/watch?v=GuJQSAiODqI", songDir);
      const fileStats = await statAsync(songDir);

      reply.header("Content-Type", "audio/mpeg");
      reply.header("Content-Length", fileStats.size);
      reply.header("Accept-Ranges", "bytes");

      const range = request.headers.range;

      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileStats.size - 1;

        const chunkSize = end - start + 1;

        reply.header("Content-Range", `bytes ${start}-${end}/${fileStats.size}`);
        reply.header("Content-Length", chunkSize);
        reply.status(206); // Partial Content

        const stream = createReadStream(songDir, { start, end });
        return reply.send(stream);
      } else {
        const stream = createReadStream(songDir);
        return reply.send(stream);
      }
    } catch (error) {
      console.error("Error:", error);

      return reply.status(500).send("Internal server error");
    }
  });
}
