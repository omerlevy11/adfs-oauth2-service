import * as crypto from 'crypto';

export function encrypt(userInfo) {
    const algorithm = process.env.TOKEN_ALGORITHM
    const iv = process.env.TOKEN_IV
    const key = process.env.TOKEN_KEY

    const cip = crypto.createCipheriv(algorithm, key, iv);
    const json = JSON.stringify(userInfo);

    return cip.update(json, 'utf8', 'hex');
}

export function decrypt(encrypted) {
    const algorithm = process.env.TOKEN_ALGORITHM
    const iv = process.env.TOKEN_IV
    const key = process.env.TOKEN_KEY

    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    return decipher.update(encrypted, 'utf8', 'hex') + decipher.final('utf8');
}