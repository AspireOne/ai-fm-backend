import dotenv from "dotenv";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { registerAppController } from "./modules/app/app.controller";
import ytService from "./modules/yt/yt.service";
import { env, validateEnv } from "./helpers/env";
import { Paths, validatePredefinedPathsExistOrThrow } from "./helpers/paths";
import sensible from "@fastify/sensible";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { setupWebSocketServer } from "./modules/websocket/websocket-server";
import audioFileManagerService from "./modules/audio-file-manager/audio-file-manager.service";
import fs from "fs";

dotenv.config();

const fastify = Fastify({
  logger: true,
});

validateEnv(env);

setInterval(() => {
  try {
    // Use the proper project root path
    const allFiles = fs.readdirSync(Paths.projectRoot);
    for (const file of allFiles) {
      if (file.endsWith("-player-script.js")) {
        const filePath = `${Paths.projectRoot}/${file}`;
        fs.unlinkSync(filePath);
        console.info(`Cleaned up stale player script: ${file}`);
      }
    }
  } catch (error: any) {
    console.error(`Error cleaning up player scripts: ${error?.message}`);
  }
}, 15_000);

const startServer = async () => {
  await validatePredefinedPathsExistOrThrow();
  try {
    audioFileManagerService.ensureDownloadDirExists();
  } catch (err: any) {
    console.error(`Failed to create downloads directory: ${err?.message}`);
  }

  // Check if yt-dlp and FFmpeg are available
  try {
    console.log("Checking if yt-dlp is available...");
    await ytService.checkYtDlpAvailability();
    console.log("yt-dlp is available.");

    console.log("Checking if FFmpeg is available...");
    await ytService.checkFfmpegAvailability();
    console.log("FFmpeg is available.");
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }

  await setupFastify();

  try {
    console.log(`Initializing routes...`);
    registerAppController(fastify);
    console.log(`Running server on port ${env.PORT}...`);
    // Set up WebSocket server on the same HTTP server
    setupWebSocketServer(fastify.server);
    await fastify.listen({ port: env.PORT, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

async function setupFastify() {
  await fastify.register(cors, {
    origin: env.NODE_ENV === "development" ? "*" : "https://fm.matejpesl.cz",
  });
  fastify.register(sensible);
  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);
}

const shutdownServer = async () => {
  try {
    console.log("Shutting down server...");
    await fastify.close();
    console.log("Server closed.");
  } catch (err) {
    fastify.log.error("Error during server shutdown:", err);
  }
};

process.on("SIGINT", shutdownServer);
process.on("SIGTERM", shutdownServer);

startServer();
