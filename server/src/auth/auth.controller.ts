import { Body, Controller, Post, Res } from '@nestjs/common';
import { SignupUserDto } from './dto/signup.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/signup')
    public signup(@Res({ passthrough: true }) res: Response, @Body() signupUserDto: SignupUserDto) {

    }

}
