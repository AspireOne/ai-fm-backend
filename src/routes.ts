import {FastifyInstance} from "fastify";

export function setupRoutes(fastify: FastifyInstance) {
  fastify.get('/ping', {}, async (request, reply) => {
    return {pong: 'it worked!'}
  })
}