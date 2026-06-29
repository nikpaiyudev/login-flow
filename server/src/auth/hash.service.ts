import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashService {
  /**
   * Hashes a plain text password using bcrypt with a salt factor of 10
   * @param password - The plain text password to be hashed
   * @returns Promise that resolves to the bcrypt hashed password string
   */
  public async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  /**
   * Compares a plain text password with a stored bcrypt hashed password to verify they match
   * @param password - The plain text password to check
   * @param hashedPassword - The stored bcrypt hashed password to compare against
   * @returns Promise that resolves to a boolean indicating if the passwords match
   */
  public async checkPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compareSync(password, hashedPassword);
  }

}
