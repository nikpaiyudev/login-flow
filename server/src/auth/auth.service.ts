import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login.dto';
import { UserService } from '@/user/user.service';
import { SignupUserDto } from './dto/signup.dto';
import { HashService } from './hash.service';
import { ResponseDto } from '@/lib/models/response.dto';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {

    constructor(private userService: UserService, private hashService: HashService, private tokenServive: TokenService) { }

    public loginUser(loginUserDto: LoginUserDto) { }

    public async signupUser(signupUserDto: SignupUserDto): Promise<ResponseDto<{ accessToken: string, refreshToken: string }>> {

        try {
            // hash the password
            const hashedPassword = await this.hashService.hashPassword(signupUserDto.password);

            // Create the new User
            const newUser = await this.userService.createUser({ ...signupUserDto, password: hashedPassword });

            // Generate the Refresh Token and Access Token
            const accessToken = this.tokenServive.generateAccessToken({ sub: newUser.data.id, name: newUser.data.username });
            const refreshToken = this.tokenServive.generateRefreshToken({ sub: newUser.data.id, name: newUser.data.username });


            return {
                message: 'Successfully LoggedIn',
                success: true,
                data: {
                    accessToken,
                    refreshToken
                }
            }

        } catch (err) {
            throw new HttpException('Signup not successful', HttpStatus.BAD_REQUEST);
        }
    }



}
