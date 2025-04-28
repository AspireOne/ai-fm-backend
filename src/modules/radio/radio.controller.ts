import { FastifyInstance } from "fastify";
import radioService from "./radio.service";
import * as assert from "node:assert";

export function registerRadioController(fastify: FastifyInstance) {
  // Radio control routes with dynamic ID parameter
  fastify.post("/radios/:id/next", async (request, reply) => {
    const { id } = request.params as { id: string };
    assert.ok(id);

    try {
      return await radioService.skipNext(id);
      return { success: true, message: `Next track for radio ${id}` };
    } catch (error) {
      reply.code(400);
      return { success: false, error: (error as Error).message };
    }
  });

  fastify.post("/radios/:id/previous", async (request, reply) => {
    const { id } = request.params as { id: string };
    assert.ok(id);

    try {
      await radioService.skipPrevious(id);
      return { success: true, message: `Previous track for radio ${id}` };
    } catch (error) {
      reply.code(400);
      return { success: false, error: (error as Error).message };
    }
  });

  fastify.post("/radios/:id/toggle-play", async (request, reply) => {
    throw new Error("Not implemented");
    const { id } = request.params as { id: string };
    assert.ok(id);

    try {
      await radioService.togglePlay(id);
      return { success: true, message: `Toggled play state for radio ${id}` };
    } catch (error) {
      reply.code(400);
      return { success: false, error: (error as Error).message };
    }
  });

  // Do not implement the ones below yet.
  // TODO: fastify GET /radios
  // TODO: fastify POST /radios (create a new radio)
}
