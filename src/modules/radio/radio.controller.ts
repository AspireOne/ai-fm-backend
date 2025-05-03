import { FastifyInstance } from "fastify";
import radioService from "./radio.service";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { createRadioInputSchema } from "./schemas/create-radio-input.schema";

export function registerRadioController(_fastify: FastifyInstance) {
  const fastify = _fastify.withTypeProvider<ZodTypeProvider>();

  fastify.post("/radios", {
    schema: { body: createRadioInputSchema },
    handler: async (request, reply) => {
      return await radioService.createRadio(request.body);
    },
  });

  /*fastify.post("/radios/:id/next", async (request, reply) => {
    const { id } = request.params as { id: string };
    return await radioService.skipNext(id);
  });

  fastify.post("/radios/:id/previous", async (request, reply) => {
    const { id } = request.params as { id: string };
    return await radioService.skipPrevious(id);
  });

  fastify.post("/radios/:id/toggle-play", async (request, reply) => {
    // throw fastify.httpErrors.notFound();
    const { id } = request.params as { id: string };
    return await radioService.togglePlay(id);
  });*/
}
