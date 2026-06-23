import { Body, Controller, Post, Res } from '@nestjs/common';
import { SignupUserDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LoginUserDto } from './dto/login.dto';
import { ResponseDto } from '@/shared/models/response.dto';
import { User } from 'generated/prisma/browser';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  public async signup(
    @Body() signupUserDto: SignupUserDto,
  ): Promise<ResponseDto<Omit<User, 'password' | 'updatedAt' | 'isVerified'>>> {
    const user = await this.authService.signupUser(signupUserDto);
    return {
      data: user,
      message: 'User Created Successfully',
      success: true,
    };
  }

  @Post('/login')
  public async login(
    @Res({ passthrough: true }) res: Response,
    @Body() loginUserDto: LoginUserDto,
  ): Promise<ResponseDto<{ accessToken: string }>> {
    const tokens = await this.authService.loginUser(loginUserDto);
    const { accessToken } = tokens;

    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 3600000, // 1 Hour
    });

    return {
      data: { accessToken },
      message: 'User logged in successfully',
      success: true,
    };
  }

  @Post('/forgot-password')
  public async forgotPassword() {}
}
