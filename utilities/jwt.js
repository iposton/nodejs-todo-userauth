import { readFile } from 'fs/promises';
import { expressjwt } from 'express-jwt';
const config = JSON.parse(await readFile(new URL('../config.json', import.meta.url)));

export function jwt() {
    const { secret } = config;
    return expressjwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate'
        ]
    });
}

export default jwt;
