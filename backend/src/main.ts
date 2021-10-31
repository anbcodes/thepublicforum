// Require the framework and instantiate it
import { FromSchema } from "json-schema-to-ts";
import { login, register } from "./auth";
import { fastify } from './fastifyApp';

const userRegistrationBodySchema = {
  type: 'object',
  properties: {
    username: { type: 'string' },
    password: { type: 'string' }
  },
  required: ['username', 'password'],
} as const;

fastify.post('/api/register', {
  schema: {
    body: userRegistrationBodySchema
  }
},
  async (request, reply) => {
    let body = (request.body as FromSchema<typeof userRegistrationBodySchema>);
    let { username, password } = body;
    reply.send(await register(username, password));
  });

const userLoginBodySchema = {
  type: 'object',
  properties: {
    username: { type: 'string' },
    password: { type: 'string' }
  },
  required: ['username', 'password'],
} as const;

fastify.post('/api/login', { schema: { body: userLoginBodySchema } }, async (request, reply) => {
  let body = (request.body as FromSchema<typeof userLoginBodySchema>);
  let { username, password } = body;
  reply.send(await login(username, password));
});

fastify.post('/api/discussions', async (request, reply) => {

});

fastify.get('/api/discussions/:id', async (request, reply) => {

});

fastify.post('/api/discussions/:id/upvote', async (request, reply) => {

});

fastify.post('/api/discussions/:id/comment/:id/upvote', async (request, reply) => {

});

fastify.post('/api/discussions/:id/comment/:id/downvote', async (request, reply) => {

});

fastify.post('/api/discussions/:id/comment', async (request, reply) => {

});

fastify.post('/api/discussions/:id/comment/:commentId', async (request, reply) => {

});

fastify.get('/api/discussions', async (request, reply) => {

});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(5000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()