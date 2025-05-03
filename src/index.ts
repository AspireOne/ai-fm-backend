import dotenv from "dotenv";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { registerAppController } from "./modules/app/app.controller";
import { env, validateEnv } from "./helpers/env";
import { validatePredefinedPathsExistOrThrow } from "./helpers/paths";
import sensible from "@fastify/sensible";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { fastify, server } from "./server";
import { initRadio } from "./utils/radio-state";

dotenv.config();

validateEnv(env);

const startServer = async () => {
  await validatePredefinedPathsExistOrThrow();

  try {
    console.log(`Initializing routes...`);
    registerAppController(fastify);
    //await initializeAudio();
    console.log(`Running server on port ${env.PORT}...`);
    server.listen(env.PORT);
    //await startContinuousAudioStream();
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

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
