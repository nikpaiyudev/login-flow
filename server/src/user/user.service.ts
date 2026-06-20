import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseDto } from '@/lib/models/response.dto';
import { User } from 'generated/prisma/browser';

@Injectable()
export class UserService {

    constructor(private prismaService: PrismaClient) { }

    public async createUser(createUserDto: CreateUserDto): Promise<ResponseDto<Omit<User, 'password' | 'updatedAt'>>> {
        try {
            const newUser = await this.prismaService.user.create({
                data: createUserDto, select: {
                    id: true,
                    fullName: true,
                    emailId: true,
                    username: true,
                    createdAt: true
                }
            });
            return {
                success: true,
                message: "User Created Successfully",
                data: newUser
            }
        } catch (e) {
            throw e;
        }
    }

}
