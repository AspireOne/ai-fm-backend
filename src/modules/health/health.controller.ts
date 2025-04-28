import {FastifyInstance} from "fastify";
import healthService from "./health.service";

export function registerHealthController(fastify: FastifyInstance) {
  fastify.get('/health', {}, async (request, reply) => {
    return {health: healthService.getHealth()}
  })
}