import {
    ConflictException,
    GoneException,
    HttpCode,
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
import { PrismaService } from '@/shared/services/prisma.service';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name, { timestamp: false });

    constructor(
        private userService: UserService,
        private hashService: HashService,
        private tokenServive: TokenService,
        private emailService: MailService,
        private prismaService: PrismaService
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
                throw new ConflictException('User already Exists');
            }

            // hash the password
            const hashedPassword = await this.hashService.hashPassword(
                signupUserDto.password,
            );

            // Create the new User
            const newUser = await this.userService.createUser({
                ...signupUserDto,
                password: hashedPassword
            });
            const emailToken = this.tokenServive.generateAccessToken({ name: newUser.fullName, sub: newUser.id, email: newUser.emailId }, '24h');
            const hashedToken = await this.tokenServive.generateHashedToken(emailToken);
            await this.prismaService.emailVerification.create({
                data: {
                    userId: newUser.id,
                    token: hashedToken,
                    emailId: newUser.emailId,
                    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
                }
            });
            const verificationEmail = this.emailService.generateEmailVerificationLink(emailToken);
            await this.emailService.sendVerificationEmail(newUser.emailId, newUser.fullName, verificationEmail);
            return newUser;
        } catch (err) {
            this.logger.error(err, 'Error while user signup');
            if (err instanceof ConflictException) throw err;
            throw new HttpException('Signup not successfull', HttpStatus.BAD_REQUEST);
        }
    }


    public async verifyEmailId(token: string): Promise<boolean> {
        try {
            // Verify if the token is expired or no
            if (!token) {
                throw new ConflictException('Token is invalid');
            }

            const tokenDecoded = this.tokenServive.verifyToken(token);
            if (!tokenDecoded) {
                throw new GoneException('Verification link has expired');
            }
            this.logger.log(tokenDecoded, 'tokenDecoded');
            const { email } = tokenDecoded as { email: string };
            const user = await this.userService.checkUserExists(email);

            if (!user) {
                throw new ConflictException('User does not exist');
            }
            // Get the hashed token and verify signature
            const verification = await this.prismaService.emailVerification.findFirst({ where: { userId: user.id } })
            if (!verification) {
                throw new ConflictException('EmailId Verification is unsuccessfull');
            }

            const isExpired = verification.expiresAt.getTime() > Date.now();

            if (isExpired) {
                throw new UnauthorizedException('Token has expired');
            }

            // Check the token hash and compare
            const isVerified = await this.hashService.checkPassword(token, verification.token);

            if (!isVerified) {
                throw new GoneException('Verification Link Expired');
            }

            await this.userService.updateUserEmailVerificationStatus(email);
            await this.prismaService.emailVerification.delete({ where: { emailId: email } });

            return true;

        } catch (err) {
            throw err;
        }
    }


    public async forgotPassword(emailId: string) {
        const user = await this.userService.checkUserExists(emailId);
        if (!user) {
            throw new NotFoundException('User does not exist');
        }
    }
}
