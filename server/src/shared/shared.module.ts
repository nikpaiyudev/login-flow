import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { MailService } from './services/mail.service';

@Module({
  providers: [PrismaService, MailService],
  exports: [PrismaService],
})
export class SharedModule {}
