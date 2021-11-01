import argon2 from 'argon2';
import { createUser, getUserByUsername } from "./database";
import { importJWK, jwtVerify, KeyLike, SignJWT } from 'jose';
import { readFile } from "fs/promises";
import pubkeyJson from './pubkey.json';
import privkeyJson from './privkey.json';

let privkey: null | (Uint8Array | KeyLike) = null;
let pubkey: null | (Uint8Array | KeyLike) = null;

const makeJwt = async (data: { id: number, username: string }) => {
    if (!privkey) {
        privkey = await importJWK(privkeyJson, 'RS256');
    }
    let jwt = await new SignJWT(data)
        .setProtectedHeader({ alg: 'RS256' })
        .setIssuedAt()
        .sign(privkey);
    return jwt;
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
        jwt: await makeJwt({
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
            jwt: await makeJwt({
                username: user.username,
                id: user.id,
            })
        }
    } else {
        return new Error('Incorrect password');
    }
}

export const extractJwt = async (token: string) => {
    if (!pubkey) {
        pubkey = await importJWK(pubkeyJson, 'RS256');
    }

    return jwtVerify(token, pubkey);
}