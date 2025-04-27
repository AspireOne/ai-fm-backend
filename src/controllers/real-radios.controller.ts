import {FastifyInstance} from "fastify";
import {realRadioService} from "../services/real-radio.service";
import * as assert from "node:assert";

export function setupRealRadiosRoutes(fastify: FastifyInstance) {
  // Radio control routes with dynamic ID parameter
  fastify.post('/radios/:id/next', async (request, reply) => {
    const {id} = request.params as { id: string };
    assert(id);

    try {
      await realRadioService.skipNext(id);
      return {success: true, message: `Next track for radio ${id}`};
    } catch (error) {
      reply.code(400);
      return {success: false, error: (error as Error).message};
    }
  });

  fastify.post('/radios/:id/previous', async (request, reply) => {
    const {id} = request.params as { id: string };
    assert(id);

    try {
      await realRadioService.skipPrevious(id);
      return {success: true, message: `Previous track for radio ${id}`};
    } catch (error) {
      reply.code(400);
      return {success: false, error: (error as Error).message};
    }
  });

  fastify.post('/radios/:id/toggle-play', async (request, reply) => {
    const {id} = request.params as { id: string };
    assert(id);

    try {
      await realRadioService.togglePlay(id);
      return {success: true, message: `Toggled play state for radio ${id}`};
    } catch (error) {
      reply.code(400);
      return {success: false, error: (error as Error).message};
    }
  });

  // Do not implement the ones below yet.
  // TODO: fastify GET /radios
  // TODO: fastify POST /radios (create a new radio)
}
