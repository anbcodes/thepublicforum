#!/bin/env node
const { generateKeyPair, exportJWK } = require("jose")
const { writeFile } = require('fs/promises');
const { resolve } = require("path");

const privkeyLocation = resolve(`${__dirname}/../backend/src/privkey.json`);
const pubkeyLocation = resolve(`${__dirname}/../frontend/src/pubkey.json`);
const secondPubkeyLocation = resolve(`${__dirname}/../backend/src/pubkey.json`);


async function main() {
    const { publicKey, privateKey } = await generateKeyPair('PS256')
    const privateJwk = await exportJWK(privateKey)
    const publicJwk = await exportJWK(publicKey)

    await writeFile(privkeyLocation, JSON.stringify(privateJwk));
    await writeFile(pubkeyLocation, JSON.stringify(publicJwk));
    await writeFile(secondPubkeyLocation, JSON.stringify(publicJwk));

    console.log("Wrote private key to " + privkeyLocation)
    console.log("Wrote public key to " + pubkeyLocation + " and " + secondPubkeyLocation)
}

main();