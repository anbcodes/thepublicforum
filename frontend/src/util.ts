import { importJWK, jwtVerify } from 'jose';
import type { KeyLike } from 'jose';
import pubkeyJson from './pubkey.json';

let pubkey: null | (Uint8Array | KeyLike) = null;

export const extractJwt = async (token: string) => {
    if (!pubkey) {
        pubkey = await importJWK(pubkeyJson, 'RS256');
    }

    return jwtVerify(token, pubkey);
}