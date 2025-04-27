import {FastifyInstance} from "fastify";
import {healthService} from "./services/health.service";
import {setupRadioRoutes} from "./controllers/radio.controller";

export function setupRoutes(fastify: FastifyInstance) {
  setupRadioRoutes(fastify);
  fastify.get('/health', {}, async (request, reply) => {
    return {health: healthService.getHealth()}
  })
}