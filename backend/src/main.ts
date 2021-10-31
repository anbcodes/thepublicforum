// Require the framework and instantiate it

import { fastify as fastifyCreator } from "fastify";
import postgres, { PostgresDb } from 'fastify-postgres';
import argon2 from 'argon2';
import { FromSchema } from "json-schema-to-ts";
import cors from 'fastify-cors';
import jwt from 'jsonwebtoken';


const fastify = fastifyCreator({ logger: true })

fastify.register(cors, {});

fastify.register(postgres, {
  connectionString: 'postgres://postgres:password@localhost/forum',
});


const makeJwt = (data: {id: number, username: string}) => {
  return jwt.sign(data, 'password');
}

// Declare a route
fastify.get('/api/users', async (request, reply) => {
  fastify.pg.connect((err, client, release) => {
    if (err) return reply.send(err);

    client.query(
      'SELECT * FROM users WHERE id=0;', [], (err: any, result: any) => {
        release();
        reply.send(err || result);
      }
    )
  });
});

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

    if (username === '') {
      let err = new Error('Invaild username');
      reply.send(err);
    }

    let hash = await argon2.hash(password);

    fastify.pg.connect((err, client, release) => {
      if (err) return reply.send(err);

      client.query(
        'INSERT INTO users (username, hash) VALUES ($1, $2) RETURNING id, username;', [username, hash], (err, result) => {
          release();
          
          if (!err) {
            
            console.log(result.rows);

            reply.send({
              jwt: makeJwt({
                id: result.rows[0].id,
                username: result.rows[0].username,
              })
            })
          } else {
          reply.send(err);
            
          }
        }
      )
    });
  });

fastify.post('/api/login', async (request, reply) => {

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