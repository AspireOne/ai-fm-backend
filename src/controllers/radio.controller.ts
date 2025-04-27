import path from 'path';
import {fileURLToPath} from 'url';
import {createReadStream} from "fs";
import {promisify} from 'util';
import {FastifyInstance} from "fastify";
import {RadioState} from "../types/radio-state.type";
import streamify from "../../utils/YTStream";
import * as fs from "node:fs";


const MP3_FILE_PATH = path.join(path.dirname(fileURLToPath(import.meta.url)), './FuckYou.mp3');
const statAsync = promisify(fs.stat);

export function setupRadioRoutes(fastify: FastifyInstance) {
  fastify.post('/radio', {
    schema: {
      querystring: {
        type: "object",
        properties: {
          radioId: {type: "string"},
        }
      }
    }
  }, async (request, reply): Promise<RadioState> => {
    return {
      radioId: "1",
      block: {
        id: "1",
        position: 1,
        type: "song",
        title: "Song 1",
        avatarUrl: "https://picsum.photos/seed/1/200/200",
      },
      totalBlocks: 10,
      hasNext: true,
      hasPrev: false,
      playState: "loading",
    }
  })


  fastify.get('/radio', {
    schema: {
      querystring: {
        type: "object",
        properties: {
          radioId: {type: "string"},
        }
      }
    }
  }, async (request, reply): Promise<RadioState> => {
    return {
      radioId: "1",
      block: {
        id: "1",
        position: 1,
        type: "song",
        title: "Song 1",
        avatarUrl: "https://picsum.photos/seed/1/200/200",
      },
      totalBlocks: 10,
      hasNext: true,
      hasPrev: false,
      playState: "loading",
    }
  })

  fastify.get("/yt-audio", {}, async (request, reply) => {
    try {
      let url = (request.query as { url: string }).url;
      url = "https://www.youtube.com/watch?v=2x_Pv6v2quw";

      reply.header('Content-Type', 'audio/mpeg');
      reply.header('Accept-Ranges', 'bytes');
      reply.header('Cache-Control', 'no-cache');

      const stream = await streamify(url);

      reply.send(stream);


    } catch (err) {
      console.error('Error handling YouTube stream:', err);
      return reply.code(500).send({error: 'Failed to process YouTube URL'});
    }
  });

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
        const stream = createReadStream(MP3_FILE_PATH, {start, end});
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
