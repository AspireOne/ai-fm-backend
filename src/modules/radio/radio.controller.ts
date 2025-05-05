import { FastifyInstance } from "fastify";
import radioCoreService from "./radio-core.service";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { createRadioInputSchema } from "./schemas/create-radio-input.schema";
import { z } from "zod";

export function registerRadioController(_fastify: FastifyInstance) {
  const fastify = _fastify.withTypeProvider<ZodTypeProvider>();

  // Create a new radio.
  fastify.post("/radios", {
    schema: { body: createRadioInputSchema },
    handler: async (request, reply) => {
      return await radioCoreService.createRadio(request.body);
    },
  });
  fastify.get("/radios", {
    handler: async (request, reply) => {
      return await radioCoreService.getRadios();
    },
  });

  // Endpoint to preload all songs for a radio
  fastify.route({
    method: ['GET', 'POST'],
    url: "/radios/:radioId/preload-all-songs",
    schema: {
      params: z.object({
        radioId: z.string()
      })
    },
    handler: async (request, reply) => {
      const { radioId } = request.params as { radioId: string };
      
      try {
        // Start the preloading process
        const result = await radioCoreService.preloadAllSongs(radioId);
        
        return {
          radioId,
          status: "complete",
          ...result
        };
      } catch (error) {
        console.error(`Error preloading songs for radio ${radioId}:`, error);
        reply.status(500);
        return {
          radioId,
          status: "error",
          message: error instanceof Error ? error.message : "Unknown error occurred"
        };
      }
    },
  });
}
