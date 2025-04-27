import path from 'path';
import { fileURLToPath } from 'url';
import {FastifyInstance} from "fastify";
import {RadioState} from "../types/radio-state.type";
import streamify from "../../utils/YTStream";

export function setupRadioRoutes(fastify: FastifyInstance) {
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

  fastify.get("/yt-audio", {

  }, async (request, reply) => {
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
      return reply.code(500).send({ error: 'Failed to process YouTube URL' });
    }
  });

  fastify.get('/local-mp3', async (request, reply) => {
    try {

      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const filePath = path.join(__dirname, '../../FuckYou.mp3');
      console.log(filePath);
      // Check if the file exists and get its stats
      let fileStats;
      try {
        fileStats = await statAsync(filePath);
      } catch (error) {
        reply.code(404).send({ error: 'File not found' });
        return;
      }

      // Handle range requests (for seeking in audio)
      const { headers } = request;
      const range = headers.range;

      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileStats.size - 1;
        const chunkSize = (end - start) + 1;

        reply.header('Content-Range', `bytes ${start}-${end}/${fileStats.size}`);
        reply.header('Accept-Ranges', 'bytes');
        reply.header('Content-Length', chunkSize);
        reply.header('Content-Type', 'audio/mpeg');
        reply.code(206); // Partial Content

        const stream = createReadStream(filePath, { start, end });
        return reply.send(stream);
      } else {
        // No range requested, send the full file
        reply.header('Content-Length', fileStats.size);
        reply.header('Content-Type', 'audio/mpeg');
        reply.header('Accept-Ranges', 'bytes');

        const stream = createReadStream(filePath);
        return reply.send(stream);
      }
    } catch (error) {
      console.error('Error streaming local MP3:', error);
      reply.code(500).send({ error: 'Internal server error' });
    }
  });

}
