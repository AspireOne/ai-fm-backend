import { FastifyInstance } from "fastify";
import radioCoreService from "./radio-core.service";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { createRadioInputSchema } from "./schemas/create-radio-input.schema";

export function registerRadioController(_fastify: FastifyInstance) {
  const fastify = _fastify.withTypeProvider<ZodTypeProvider>();

  // Create a new radio.
  fastify.post("/radios", {
    schema: { body: createRadioInputSchema },
    handler: async (request, reply) => {
      return await radioCoreService.createRadio(request.body);
    },
  });
}
