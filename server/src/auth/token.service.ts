import { Injectable } from '@nestjs/common';
import * as token from 'jsonwebtoken';

const REFRESH_TOKEN_EXPIRY = '7d';
const ACCESS_TOKEN_EXPIRY = '10m';

type jwtPaylod = {
    sub: number;
    name: string;
}

@Injectable()
export class TokenService {

    // Token Service
    constructor() { }

    /**
     * Generates a refresh token for the given username.
     * Refresh tokens are long-lived (7 days) and used to obtain new access tokens.
     * @param username - The username to include in the token payload.
     * @returns The signed refresh token.
     */
    public generateRefreshToken(payload: jwtPaylod) {
        return this.generateToken(payload, REFRESH_TOKEN_EXPIRY);
    }

    /**
     * Generates an access token for the given username.
     * Access tokens are short-lived (1 hour) and used for API authentication.
     * @param username - The username to include in the token payload.
     * @returns The signed access token.
     */
    public generateAccessToken(payload: jwtPaylod) {
        return this.generateToken(payload, ACCESS_TOKEN_EXPIRY)
    }

    /**
     * Generates a JWT token with the specified payload and expiration.
     * This is a private helper method used by both access and refresh token generators.
     * @param username - The username to include in the token payload.
     * @param expiresIn - The expiration time for the token.
     * @returns The signed JWT token.
     */
    private generateToken(payload: jwtPaylod, expiresIn: any) {
        const secret = process.env["JWT_SECRET"] || "nikhil";
        return token.sign({ payload }, secret, { expiresIn })
    }

}
