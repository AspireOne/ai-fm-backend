import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { moderators } from "./voiceover-moderators";

export function registerVoiceoverController(_fastify: FastifyInstance) {
  const fastify = _fastify.withTypeProvider<ZodTypeProvider>();

  fastify.get("/voiceover/moderators", {
    handler: async (request, reply) => {
      return moderators.list.map((mod) => ({
        id: mod.id,
        name: mod.name,
        personality: mod.personality,
      }));
    },
  });
}
