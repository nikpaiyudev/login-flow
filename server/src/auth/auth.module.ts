import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '@/user/user.module';
import { HashService } from './hash.service';
import { TokenService } from './token.service';

@Module({
  providers: [AuthService, HashService, TokenService],
  controllers: [AuthController],
  imports: [UserModule],
})
export class AuthModule {}
