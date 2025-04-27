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

      // Set appropriate headers for audio streaming
      reply.header('Content-Type', 'audio/mp4');

      const stream = await streamify(url);

      reply.send(stream);


    } catch (err) {
      console.error('Error handling YouTube stream:', err);
      return reply.code(500).send({ error: 'Failed to process YouTube URL' });
    }
  });

}