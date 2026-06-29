import { Injectable } from '@nestjs/common';
import * as token from 'jsonwebtoken';
import { HashService } from './hash.service';

const REFRESH_TOKEN_EXPIRY = '7d';
const ACCESS_TOKEN_EXPIRY = '10m';

type jwtPaylod = {
  sub: number;
  name: string;
  email?: string;
};

@Injectable()
export class TokenService {

  readonly secret = process.env['JWT_SECRET'] || 'nikhil';

  // Token Service
  constructor(private hashService: HashService) { }

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
  public generateAccessToken(payload: jwtPaylod, expiry?: string) {
    return this.generateToken(payload, expiry ? expiry : ACCESS_TOKEN_EXPIRY);
  }

  /**
   * Generates a JWT token with the specified payload and expiration.
   * This is a private helper method used by both access and refresh token generators.
   * @param username - The username to include in the token payload.
   * @param expiresIn - The expiration time for the token.
   * @returns The signed JWT token.
   */
  private generateToken(payload: jwtPaylod, expiresIn: any) {
    return token.sign({ payload }, this.secret, { expiresIn });
  }

  /**
   * Generates a hashed version of a token for secure storage.
   * Hashes the input token using the application's password hashing service,
   * ensuring stored tokens cannot be reversed or misused if compromised.
   * @param token - The plaintext JWT token to be hashed.
   * @returns The hashed string representation of the input token.
   */
  public generateHashedToken(token: string) {
    return this.hashService.hashPassword(token);
  }

  /**
   * Decodes a JWT token to extract its raw payload without signature verification.
   * This method only parses the token's contents; it does not validate the token's authenticity or expiration.
   * @param authToken - The encoded JWT token string to decode.
   * @returns The decoded token payload containing the original claims.
   */
  public decodeToken(authToken: string) {
    return token.decode(authToken);
  }

  /**
   * Verifies a JWT token's signature and validity, ensuring it was issued by this server.
   * Validates the token's signature using the application's secret key, checks for expiration,
   * and returns the decoded payload if the token is legitimate. Throws an error if verification fails.
   * @param authToken - The encoded JWT token string to verify.
   * @returns The verified and decoded token payload with valid claims.
   */
  public verifyToken(authToken: string) {
    return token.verify(authToken, this.secret);
  }



}
