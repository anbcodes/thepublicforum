import { fastify } from "./fastifyApp";

export const createUser = async (username: string, hash: string): Promise<{ username: string, id: number }> => {
    let conn = await fastify.pg.connect();

    let result = await conn.query(
        'INSERT INTO users (username, hash) VALUES ($1, $2) RETURNING id, username;', [username, hash],
    );
    conn.release();

    return {
        id: result.rows[0].id,
        username: result.rows[0].username,
    };
}

export const getUserByUsername = async (username: string): Promise<{ username: string, hash: string, id: number }> => {
    let conn = await fastify.pg.connect();

    let result = await conn.query(
        'SELECT * FROM users WHERE username=$1;', [username],
    );
    conn.release();

    return result.rows[0];
}