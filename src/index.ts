import dotenv from "dotenv";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { registerAppController } from "./modules/app/app.controller";
import { env, validateEnv } from "./helpers/env";
import { validatePredefinedPathsExistOrThrow } from "./helpers/paths";

dotenv.config();
validateEnv(env);
await validatePredefinedPathsExistOrThrow();
const fastify = Fastify({
  logger: true,
});

await fastify.register(cors, {
  origin: "*",
});

const startServer = async () => {
  try {
    console.log(`Initializing routes...`);
    registerAppController(fastify);

    console.log(`Running server on port ${env.PORT}...`);
    await fastify.listen({ port: env.PORT });
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
