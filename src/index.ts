// import dotenv
import dotenv from 'dotenv'
import Fastify from 'fastify'
import assert from "node:assert";
import {setupAppRoutes} from "./controllers/app.controller";

dotenv.config();

const PORT = Number(process.env["PORT"] ?? 5005);
assert(Number.isInteger(PORT));

const fastify = Fastify({
  logger: true
})

try {
  console.log(`Initializing routes...`);
  setupAppRoutes(fastify);
  console.log(`Running server on port ${PORT}...`);
  await fastify.listen({port: PORT});
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}