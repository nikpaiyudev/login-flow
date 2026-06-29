import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'generated/prisma/browser';
import { PrismaService } from '@/shared/services/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) { }

  /**
   * Creates a new user in the database.
   * First checks if a user with the same email already exists.
   * @param createUserDto - The user data for creation.
   * @returns A response object with the created user data (excluding password).
   */
  public async createUser(
    createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password' | 'updatedAt' | 'isVerified'>> {
    try {
      const isUserExists = await this.checkUserExists(createUserDto.emailId);
      if (isUserExists) {
        throw new ConflictException('A User with this email already exists');
      }
      const newUser = await this.prismaService.user.create({
        data: createUserDto,
        select: {
          id: true,
          fullName: true,
          emailId: true,
          username: true,
          createdAt: true,
        },
      });
      return newUser;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Checks if a user exists with the given email address.
   * Queries the database for a user with the specified emailId.
   * @param emailId - The email address to check for existence.
   * @returns True if user exists, false otherwise.
   */
  public async checkUserExists(emailId: string): Promise<User | null> {
    try {
      const user = this.prismaService.user.findUnique({ where: { emailId } });
      return user || null;
    } catch (e) {
      throw new ConflictException('Error in Finding User');
    }
  }


  /**
   * Deletes a user from the database by their email address.
   * Removes the user record associated with the specified emailId.
   * @param emailId - The email address of the user to delete.
   * @returns A promise that resolves when the user is successfully deleted.
   */
  public async deleteUser(emailId: string) {
    try {
      this.prismaService.user.delete({ where: { emailId } });
    } catch (err) {
      throw new Error('Error happened while deleting user');
    }
  }


  /**
   * Updates the email verification status of a user to verified.
   * Sets the `isVerified` flag to true for the user with the specified emailId.
   * @param emailId - The email address of the user whose verification status needs updating.
   * @returns A promise that resolves to the updated user record.
   */
  public async updateUserEmailVerificationStatus(emailId: string,) {
    try {
      return this.prismaService.user.update({ where: { emailId }, data: { isVerified: true } });
    } catch (err) {
      throw err;
    }
  }

}
