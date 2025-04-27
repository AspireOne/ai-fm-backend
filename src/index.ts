// import dotenv
import dotenv from 'dotenv'
import Fastify from 'fastify'
import assert from "node:assert";

dotenv.config();

const PORT = Number(process.env["PORT"] ?? 3000);
assert(Number.isInteger(PORT));

const fastify = Fastify({
  logger: true
})

// Declare a route
fastify.get('/', async function handler(request, reply) {
  return {hello: 'world'}
})

// Run the server!
try {
  console.log(`Running server on port ${PORT}...`);
  await fastify.listen({port: PORT})
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}