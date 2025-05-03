import { FastifyInstance } from "fastify";
import { registerRadioController } from "../radio/radio.controller";
import { registerStreamController } from "../stream/stream.controller";

/**
 * The main controller - registers all other controllers.
 * @param fastify
 */
export function registerAppController(fastify: FastifyInstance) {
  fastify.get("/", async function handler(request, reply) {
    return { state: "ok" };
  });
  registerStreamController(fastify);
  registerRadioController(fastify);
}
