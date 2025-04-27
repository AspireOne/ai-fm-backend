import path from 'path';
import { fileURLToPath } from 'url';
import {createReadStream} from "fs";
import { promisify } from 'util';
import {FastifyInstance} from "fastify";
import {RadioState} from "../types/radio-state.type";
import { stat} from 'fs/promises';
import * as fs from "node:fs";


const MP3_FILE_PATH = path.join(path.dirname(fileURLToPath(import.meta.url)), './FuckYou.mp3');
const statAsync = promisify(fs.stat);

export function setupRadioRoutes(fastify: FastifyInstance) {
  fastify.get('/local-mp3', async (request, reply) => {
    try {
      // Get file stats to determine size
      const fileStats = await statAsync(MP3_FILE_PATH);

      // Set appropriate headers for streaming audio
      reply.header('Content-Type', 'audio/mpeg');
      reply.header('Content-Length', fileStats.size);
      reply.header('Accept-Ranges', 'bytes');

      // Handle range requests (important for seeking within audio)
      const range = request.headers.range;

      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileStats.size - 1;

        // Calculate chunk size
        const chunkSize = (end - start) + 1;

        // Set range-specific headers
        reply.header('Content-Range', `bytes ${start}-${end}/${fileStats.size}`);
        reply.header('Content-Length', chunkSize);
        reply.status(206); // Partial Content

        // Create and pipe the stream for the specific range
        const stream = createReadStream(MP3_FILE_PATH, { start, end });
        return reply.send(stream);
      } else {
        // Stream the entire file
        const stream = createReadStream(MP3_FILE_PATH);
        return reply.send(stream);
      }

    } catch (error) {
      console.error('Error:', error);

        return reply.status(500).send('Internal server error');
    }

  })
}
