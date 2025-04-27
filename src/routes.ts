import {FastifyInstance} from "fastify";
import {healthService} from "./services/health.service";
import streamYT from "../utils/YTStream";

export function setupRoutes(fastify: FastifyInstance) {
  fastify.get('/health', {}, async (request, reply) => {
    return {health: healthService.getHealth()}
  })

}