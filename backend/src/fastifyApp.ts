import { fastify as fastifyCreator } from "fastify";
import postgres from 'fastify-postgres';

import cors from 'fastify-cors';


const fastifyApp = fastifyCreator({ logger: true })

fastifyApp.register(cors, {});

fastifyApp.register(postgres, {
    connectionString: 'postgres://postgres:password@localhost/forum',
});

export const fastify = fastifyApp;