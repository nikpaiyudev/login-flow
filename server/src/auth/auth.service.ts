import { ConflictException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/login.dto';
import { UserService } from '@/user/user.service';
import { SignupUserDto } from './dto/signup.dto';
import { HashService } from './hash.service';
import { ResponseDto } from '@/lib/models/response.dto';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {

    constructor(private userService: UserService, private hashService: HashService, private tokenServive: TokenService) { }

    public async loginUser(loginUserDto: LoginUserDto): Promise<{ accessToken: string, refreshToken: string }> {
        try {
            const { emailId, password } = loginUserDto;

            // Check the User
            const user = await this.userService.checkUserExists(emailId);
            if (!user) {
                throw new ConflictException('User doesnot exists');
            }

            // Check the Password
            const isPasswordMatch = await this.hashService.checkPassword(password, user.password);
            if (!isPasswordMatch) {
                throw new UnauthorizedException('Invalid Credentials');
            }

            const accessToken = this.tokenServive.generateAccessToken({ sub: user.id, name: user.fullName });
            const refreshToken = this.tokenServive.generateRefreshToken({ sub: user.id, name: user.fullName });

            return { accessToken, refreshToken }

        } catch (e) {
            throw e;
        }
    }

    public async signupUser(signupUserDto: SignupUserDto): Promise<ResponseDto<null>> {

        try {

            const user = await this.userService.checkUserExists(signupUserDto.emailId);

            if (user) {
                throw new ConflictException("User already exists");
            }

            // hash the password
            const hashedPassword = await this.hashService.hashPassword(signupUserDto.password);

            // Create the new User
            await this.userService.createUser({ ...signupUserDto, password: hashedPassword });

            return {
                message: 'Successfully LoggedIn',
                success: true,
                data: null
            }

        } catch (err) {
            if (err instanceof ConflictException) throw err;
            throw new HttpException('Signup not successful', HttpStatus.BAD_REQUEST);
        }
    }



}
