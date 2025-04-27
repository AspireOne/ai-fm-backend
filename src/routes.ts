import fastify from 'fastify';
import streamify from './your-streamify-module'; // Import your streamify function
import {FastifyInstance} from "fastify";
import {healthService} from "./services/health.service";
import streamYT from "../utils/YTStream";

export function setupRoutes(fastify: FastifyInstance) {
  fastify.get('/health', {}, async (request, reply) => {
    return {health: healthService.getHealth()}
  })

  fastify.get("/yt-audio", {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          url: { type: 'string' }
        },
        required: ['url']
      }
    }
  }, async (request, reply) => {
    try {
      const url = (request.query as { url: string }).url;
      reply.header('Content-Type', 'audio/mpeg');
      reply.header('Transfer-Encoding', 'chunked');
      const stream = streamify(url);
      stream.on('error', (err) => {
        console.error('Stream error:', err);
        if (!reply.sent) {
          reply.code(500).send({ error: 'Streaming failed' });
        }
      });
      return stream.pipe(reply.raw);
    } catch (err) {
      console.error('Error handling YouTube stream:', err);
      return reply.code(500).send({ error: 'Failed to process YouTube URL' });
    }
  });

  fastify.get("/test", {}, async (request, reply) => {
    try {
      const url = "https://www.youtube.com/watch?v=2x_Pv6v2quw";
      reply.header('Content-Type', 'audio/mpeg');
      reply.header('Transfer-Encoding', 'chunked');
      const stream = streamify(url);
      stream.on('error', (err) => {
        console.error('Stream error:', err);
        if (!reply.sent) {
          reply.code(500).send({ error: 'Streaming failed' });
        }
      });
      return stream.pipe(reply.raw);
    } catch (err) {
      console.error('Error in test endpoint:', err);
      return reply.code(500).send({ error: 'Test endpoint failed' });
    }
  });
}
