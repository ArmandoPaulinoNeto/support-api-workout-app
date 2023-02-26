const crypt = require('crypto');
const base64url = require('base64url');
require('dotenv/config');

const header: { alg: string; typ: string; } = {
    alg: 'HS256',
    typ: 'JWT'
};

const payload: { userName: string; name: string; exp} = {
    userName: 'armando@gmail.com',
    name: 'Armando Paulino',
    exp: new Date().getTime(),
};

const headerEncoded = base64url.encode(JSON.stringify(header));
const payloadEncoded = base64url.encode(JSON.stringify(payload));

const key = process.env.SECRET_KEY;


const signature = crypt.createHmac('sha256', key)
                        .update(`${headerEncoded}.${payloadEncoded}`)
                        .digest('bin');

console.log(signature);
const token = `${headerEncoded}.${payloadEncoded}.${base64url.encode(signature)}`;

console.log(token);