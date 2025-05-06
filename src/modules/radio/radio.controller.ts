import { FastifyInstance } from "fastify";
import radioCoreService from "./radio-core.service";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { createRadioInputSchema } from "./schemas/create-radio-input.schema";
import { z } from "zod";
// @formatter:off
// prettier-ignore
// @ts-ignore
// This NEEDS to be here.
// eslint-disable-next-line import/no-extraneous-dependencies
import { MultipartFile } from "@fastify/multipart";
// @formatter:on
import audioManagerService from "../audio-file-manager/audio-file-manager.service";
import fs from "fs";

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
    method: ["GET", "POST"],
    url: "/radios/:radioId/preload-all-songs",
    schema: {
      params: z.object({
        radioId: z.string(),
      }),
    },
    handler: async (request, reply) => {
      const { radioId } = request.params as { radioId: string };

      try {
        // Start the preloading process
        const result = await radioCoreService.preloadAllSongs(radioId);

        return {
          radioId,
          status: "complete",
          ...result,
        };
      } catch (error) {
        console.error(`Error preloading songs for radio ${radioId}:`, error);
        reply.status(500);
        return {
          radioId,
          status: "error",
          message: error instanceof Error ? error.message : "Unknown error occurred",
        };
      }
    },
  });

  // Endpoint to download songs from radio and forward to another server
  fastify.route({
    method: ["GET", "POST"],
    url: "/radios/:radioId/forward-to-server",
    schema: {
      params: z.object({
        radioId: z.string(),
      }),
      querystring: z.object({
        serverUrl: z.string().url("Must be a valid URL"),
      }),
    },
    handler: async (request, reply) => {
      const { radioId } = request.params as { radioId: string };
      const { serverUrl } = request.query as { serverUrl: string };

      try {
        // Start the process of downloading and forwarding songs
        const result = await radioCoreService.downloadAndForwardSongs(radioId, serverUrl);

        return {
          radioId,
          serverUrl,
          status: "complete",
          ...result,
        };
      } catch (error) {
        console.error(
          `Error forwarding songs for radio ${radioId} to ${serverUrl}:`,
          error,
        );
        reply.status(500);
        return {
          radioId,
          serverUrl,
          status: "error",
          message: error instanceof Error ? error.message : "Unknown error occurred",
        };
      }
    },
  });

  // Endpoint to get all blocks for a radio
  fastify.get("/radios/:radioId/blocks", {
    schema: {
      params: z.object({
        radioId: z.string(),
      }),
    },
    handler: async (request, reply) => {
      const { radioId } = request.params as { radioId: string };

      try {
        // Get the radio with all its blocks
        const radio = await radioCoreService.getRadioOrThrow(radioId);

        // Enhance blocks with download status
        const enhancedBlocks = radio.blocks.map((block) => {
          const audioPath = audioManagerService.getBlockAudioPath(block.id, block.type);
          const isDownloaded =
            fs.existsSync(audioPath) && fs.statSync(audioPath).size > 0;

          return {
            ...block,
            isDownloaded,
            audioPath: isDownloaded ? audioPath : undefined,
          };
        });

        return {
          radioId,
          blocks: enhancedBlocks,
          total: enhancedBlocks.length,
          songCount: enhancedBlocks.filter((block) => block.type === "song").length,
          voiceoverCount: enhancedBlocks.filter((block) => block.type === "voiceover")
            .length,
          sweeperCount: enhancedBlocks.filter((block) => block.type === "sweeper").length,
          downloadedCount: enhancedBlocks.filter((block) => block.isDownloaded).length,
        };
      } catch (error) {
        console.error(`Error getting blocks for radio ${radioId}:`, error);
        reply.status(500);
        return {
          radioId,
          status: "error",
          message: error instanceof Error ? error.message : "Unknown error occurred",
        };
      }
    },
  });

  // Endpoint to upload songs with their block IDs
  fastify.post("/radios/upload-songs", {
    config: {
      rawBody: true,
    },
    handler: async (request, reply) => {
      try {
        // Get the multipart data
        const parts = request.parts();

        let buffer: Buffer | null = null;
        let filename = "";
        let blockId = "";
        let radioId = "";
        let title: string | null = null;

        // Process each part
        for await (const part of parts) {
          if (part.type === "file") {
            buffer = await part.toBuffer();
            filename = part.filename;
          } else {
            // This is a field
            if (part.fieldname === "blockId") {
              blockId = part.value as string;
            }
            if (part.fieldname === "radioId") {
              radioId = part.value as string;
            }
            if (part.fieldname === "title") {
              title = part.value as string;
            }
          }
        }

        if (!buffer) {
          reply.status(400);
          return {
            status: "error",
            message: "No file uploaded",
          };
        }

        const songEntries = [];

        if (!blockId || !radioId) {
          reply.status(400);
          return {
            status: "error",
            message: "blockId and radioId are required",
          };
        }

        songEntries.push({
          blockId,
          radioId,
          fileBuffer: buffer,
          filename: filename,
          title: title
        });

        // Save the uploaded songs
        const result = await radioCoreService.uploadSongs({ songs: songEntries });

        return {
          status: "success",
          message: "Songs uploaded successfully",
          ...result,
        };
      } catch (error) {
        console.error("Error uploading songs:", error);
        reply.status(500);
        return {
          status: "error",
          message: error instanceof Error ? error.message : "Unknown error occurred",
        };
      }
    },
  });
}
