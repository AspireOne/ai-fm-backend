import {FastifyInstance} from "fastify";
import {RadioState} from "../types/radio-state.type";

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
}