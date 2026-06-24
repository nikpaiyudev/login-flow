import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { createTestAccount } from 'nodemailer';
import { join } from 'path';
import { MailModule } from './mail/mail.module';



@Module({
  imports: [
    UserModule,
    AuthModule,
    SharedModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
