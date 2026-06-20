import { Body, Controller, Post, Res } from '@nestjs/common';
import { SignupUserDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LoginUserDto } from './dto/login.dto';
import { ResponseDto } from '@/lib/models/response.dto';
import { User } from 'generated/prisma/browser';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/signup')
    public async signup(@Body() signupUserDto: SignupUserDto): Promise<ResponseDto<User>> {
        const user = await this.authService.signupUser(signupUserDto);

    }

    @Post('/login')
    public async login(@Res({ passthrough: true }) res: Response, @Body() loginUserDto: LoginUserDto): Promise<ResponseDto<{ accessToken: string }>> {
        const tokens = await this.authService.loginUser(loginUserDto);
        const { accessToken } = tokens;

        res.cookie('refresh_token', tokens.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 3600000
        });

        return {
            data: { accessToken },
            message: 'User logged in successfully',
            success: true
        }

    }

}
