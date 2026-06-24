import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { createTestAccount } from 'nodemailer';
import { join } from 'path';
import { MailService } from './mail.service';

// Create Ethereal test account
let etherealAccount;

async function setupEthereal() {
    try {
        etherealAccount = await createTestAccount();
        console.log('Ethereal account created:');
        console.log(`Email: ${etherealAccount.user}`);
        console.log(`Password: ${etherealAccount.pass}`);
        console.log(`SMTP: ${etherealAccount.smtp.host}:${etherealAccount.smtp.port}`);
        console.log(`Web UI: https://ethereal.email/login`);
        return etherealAccount;
    } catch (error) {
        console.error('Failed to create Ethereal account:', error);
        throw error;
    }
}

@Module({
    providers: [MailService],
    imports: [
        MailerModule.forRootAsync({
            useFactory: async () => {
                const testAccount = await setupEthereal();
                return {
                    transport: {
                        host: testAccount.smtp.host,
                        port: testAccount.smtp.port,
                        secure: testAccount.smtp.secure,
                        auth: {
                            user: testAccount.user,
                            pass: testAccount.pass,
                        },
                    },
                    defaults: {
                        from: '"Test Account" <test@ethereal.email>',
                    },
                    template: {
                        dir: join(__dirname, 'shared/templates'),
                        options: {
                            strict: true,
                        },
                    },
                };
            },
        })
    ],
    exports: [MailService]
})
export class MailModule { }
