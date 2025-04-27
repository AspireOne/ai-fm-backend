import {FastifyInstance} from "fastify";
import {healthService} from "../services/health.service";
import {setupRadioRoutes} from "./radio.controller";

/**
 * The main controller - export all routes from here.
 * @param fastify
 */
export function setupAppRoutes(fastify: FastifyInstance) {
  fastify.get('/', async function handler(request, reply) {
    return {state: 'ok'}
  })
  fastify.get('/health', {}, async (request, reply) => {
    return {health: healthService.getHealth()}
  })
  setupRadioRoutes(fastify);
}