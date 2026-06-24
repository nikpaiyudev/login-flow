import {
    ConflictException,
    HttpException,
    HttpStatus,
    Injectable,
    Logger,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login.dto';
import { UserService } from '@/user/user.service';
import { SignupUserDto } from './dto/signup.dto';
import { HashService } from './hash.service';
import { TokenService } from './token.service';
import { User } from 'generated/prisma/client';
import { MailService } from '@/mail/mail.service';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name, { timestamp: false });

    constructor(
        private userService: UserService,
        private hashService: HashService,
        private tokenServive: TokenService,
        private emailService: MailService
    ) { }

    public async loginUser(
        loginUserDto: LoginUserDto,
    ): Promise<{ accessToken: string; refreshToken: string }> {
        try {
            const { emailId, password } = loginUserDto;

            this.logger.log('User Login Information', { emailId, password });

            // Check the User
            const user = await this.userService.checkUserExists(emailId);
            this.logger.log('user info after checking user exists', user);
            if (!user) {
                throw new ConflictException('User doesnot exists');
            }

            // Check the Password
            const isPasswordMatch = await this.hashService.checkPassword(
                password,
                user.password,
            );
            this.logger.log('User Password Match', isPasswordMatch);
            if (!isPasswordMatch) {
                throw new UnauthorizedException('Invalid Credentials');
            }

            const accessToken = this.tokenServive.generateAccessToken({
                sub: user.id,
                name: user.fullName,
            });
            const refreshToken = this.tokenServive.generateRefreshToken({
                sub: user.id,
                name: user.fullName,
            });
            this.logger.log('Token Information', { accessToken, refreshToken });
            return { accessToken, refreshToken };
        } catch (e) {
            console.log(e, 'e');
            throw e;
        }
    }

    public async signupUser(
        signupUserDto: SignupUserDto,
    ): Promise<Omit<User, 'password' | 'updatedAt' | 'isVerified'>> {
        try {
            const user = await this.userService.checkUserExists(
                signupUserDto.emailId,
            );
            if (user) {
                throw new Error('User already exists');
            }

            // hash the password
            const hashedPassword = await this.hashService.hashPassword(
                signupUserDto.password,
            );

            // Create the new User
            const newUser = await this.userService.createUser({
                ...signupUserDto,
                password: hashedPassword,
            });

            const emailToken = this.tokenServive.generateAccessToken({ name: newUser.fullName, sub: newUser.id });
            const verificationEmail = this.emailService.generateEmailVerificationLink(emailToken);
            await this.emailService.sendVerificationEmail(newUser.emailId, newUser.fullName, verificationEmail);
            await this.userService.deleteUser(signupUserDto.emailId);
            return newUser;

        } catch (err) {
            this.logger.error(err, 'Error while user signup');
            await this.userService.deleteUser(signupUserDto.emailId);
            if (err instanceof ConflictException) throw err;
            throw new HttpException('Signup not successfull', HttpStatus.BAD_REQUEST);
        }
    }

    public async forgotPassword(emailId: string) {
        const user = await this.userService.checkUserExists(emailId);
        if (!user) {
            throw new NotFoundException('User does not exist');
        }
    }
}
