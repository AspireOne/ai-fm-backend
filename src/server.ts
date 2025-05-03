import { Server } from "socket.io";
import { createServer } from "http";
import Fastify from "fastify";
import cors from "@fastify/cors";
import sensible from "@fastify/sensible";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";

const fastify = Fastify({
  logger: true,
});
fastify.register(cors, { origin: "*" });
fastify.register(sensible);
fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);
const server = createServer(fastify.server);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    credentials: true,
  },
});

export { fastify, server, io };
