import jwt from "jsonwebtoken";
import argon2 from 'argon2';
import { createUser, getUserByUsername } from "./database";

const JWT_SECRET = 'password';

const makeJwt = (data: { id: number, username: string }) => {
    return jwt.sign(data, JWT_SECRET);
}

const isValidUsername = (name: string) => name !== '' && name.length < 50 && /^[0-9A-Za-z_]+$/.test(name);
const isValidPassword = (pwd: string) => pwd !== '' && pwd.length > 10 && pwd.length < 50 && /^[ -~]+$/.test(pwd);

export const register = async (username: string, password: string): Promise<{ jwt: string } | Error> => {
    if (!isValidUsername(username)) {
        return new Error('Invaild username ' + username);
    }
    if (!isValidPassword(password)) {
        return new Error('Invaild password');
    }

    let hash = await argon2.hash(password);
    let user = await createUser(username, hash);

    return {
        jwt: makeJwt({
            username: user.username,
            id: user.id,
        })
    }
}

export const login = async (username: string, password: string): Promise<{ jwt: string } | Error> => {
    if (!isValidUsername(username)) {
        return new Error('Invaild username');
    }
    if (!isValidPassword(password)) {
        return new Error('Invaild password');
    }

    let user = await getUserByUsername(username);
    let correctPassword = await argon2.verify(user.hash, password);

    if (correctPassword) {
        return {
            jwt: makeJwt({
                username: user.username,
                id: user.id,
            })
        }
    } else {
        return new Error('Incorrect password');
    }
}

export const extractJwt = (token: string) => {
    return jwt.verify(token, JWT_SECRET);
}