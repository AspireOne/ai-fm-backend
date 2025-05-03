import { FastifyInstance } from "fastify";
import fs from "fs";
import radioCoreService from "../radio/radio-core.service";
import audioFileManagerService from "../audio-file-manager/audio-file-manager.service";

export function registerStreamController(fastify: FastifyInstance) {
  fastify.get("/radios/:id/stream/:blockId", async (request, reply) => {
    const { id: radioId, blockId } = request.params as { id: string; blockId: string };

    try {
      // Get the radio to verify it exists and the block belongs to it
      const radio = await radioCoreService.getRadioOrThrow(radioId);

      // Find the block in the radio
      const block = radio.blocks.find((b) => b.id === blockId);
      if (!block) {
        return reply.status(404).send({ error: "Block not found in this radio" });
      }

      // Get the audio file path
      const audioFilePath = audioFileManagerService.getBlockAudioPath(
        blockId,
        block.type,
      );

      // Check if the file exists
      if (!fs.existsSync(audioFilePath)) {
        // Audio doesn't exist (yet), return with a 404. Do not download it here.
        return reply
          .status(404)
          .send({ error: "Audio file does not exist. Wait until it's downloaded." });
      }

      // Set appropriate headers for audio streaming
      reply.header("Content-Type", "audio/mpeg");
      reply.header("Accept-Ranges", "bytes");

      // Create a read stream and pipe it to the response
      const stream = fs.createReadStream(audioFilePath);
      return reply.send(stream);
    } catch (error) {
      console.error(`Error streaming audio for block ${blockId}:`, error);
      return reply.status(500).send({ error: "Failed to stream audio" });
    }
  });
}
