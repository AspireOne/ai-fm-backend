import path from "path";
import { fileURLToPath } from "url";
import { createReadStream } from "fs";
import { promisify } from "util";
import { FastifyInstance } from "fastify";
import * as fs from "node:fs";
import { ensureAudioDir, ensureAudioFile } from "../../utils/checkAudioDir";
import { OptionalPaths } from "../../providers/paths";

const AUDIO_DIR = OptionalPaths.downloadedFilesDir;
const statAsync = promisify(fs.stat);

export function registerStreamController(fastify: FastifyInstance) {
  ensureAudioDir(AUDIO_DIR);

  fastify.get("/stream", async (request, reply) => {
    try {
      const songDir = AUDIO_DIR + "/HUH.mp3";
      await ensureAudioFile(
        "https://www.youtube.com/watch?v=GuJQSAiODqI",
        "HUH",
        AUDIO_DIR,
      );
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
