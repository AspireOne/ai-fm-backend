// import dotenv
import dotenv from 'dotenv'
import Fastify from 'fastify'
import cors from '@fastify/cors';
import assert from "node:assert";
import {setupAppRoutes} from "./controllers/app.controller";

dotenv.config();

const PORT = Number(process.env["PORT"] ?? 5000);
assert(Number.isInteger(PORT));

const fastify = Fastify({
  logger: true
})


await fastify.register(cors, {
  origin: 'http://localhost:3000'
});

const startServer = async () => {
  try {
    console.log(`Initializing routes...`);
    setupAppRoutes(fastify);
    console.log(`Running server on port ${PORT}...`);
    await fastify.listen({ port: PORT });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

const shutdownServer = async () => {
  try {
    console.log('Shutting down server...');
    await fastify.close();
    console.log('Server closed.');
  } catch (err) {
    fastify.log.error('Error during server shutdown:', err);
  }
};

process.on('SIGINT', shutdownServer);
process.on('SIGTERM', shutdownServer);

startServer();
