import { FastifyInstance } from "fastify";
import streamService from "./stream-example.service";

/*
This controller is just an example / demo / temp testing file. Do not use.
* */

export function registerStreamController(fastify: FastifyInstance) {
  // Initialize the audio directory
  streamService.ensureAudioDirectory();

  fastify.get("/stream", async (request, reply) => {
    try {
      // Prepare the song for streaming (download if needed)
      const songPath = await streamService.prepareSongForStreaming(
        "https://www.youtube.com/watch?v=GuJQSAiODqI",
        "HUH",
      );

      // Create the audio stream-example
      const { stream, headers, statusCode } = await streamService.createAudioStream(
        songPath,
        request.headers.range as string | undefined,
      );

      // Set response headers
      for (const [key, value] of Object.entries(headers)) {
        reply.header(key, value);
      }

      // Set status code
      reply.status(statusCode);

      // Send the stream-example
      return reply.send(stream);
    } catch (error) {
      console.error("Error:", error);
      return reply.status(500).send("Internal server error");
    }
  });
}
