import {FastifyInstance} from "fastify";
import {registerRadioController} from "../radio/radio.controller";
import {registerHealthController} from "../health/health.controller";
import {registerStreamController} from "../stream/stream.controller";

/**
 * The main controller - registers all other controllers.
 * @param fastify
 */
export function registerAppController(fastify: FastifyInstance) {
  fastify.get('/', async function handler(request, reply) {
    return {state: "ok"}
  })
  registerStreamController(fastify);
  registerHealthController(fastify);
  registerRadioController(fastify);
}