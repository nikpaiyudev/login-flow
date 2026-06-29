import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

type TemplateVariables = {
  [key: string]: string;
};

@Injectable()
export class MailService {

  private readonly templatesDir = path.join(process.cwd(), 'src/shared/templates');
  private readonly logger = new Logger(MailService.name, { timestamp: false });

  constructor(private readonly mailerService: MailerService) { }

  /**
   * Generates a verification link with signed JWT token for email confirmation
   * @param name - Name of the user to include in the JWT payload
   * @param sub - Subject identifier (user ID) to include in the JWT payload
   * @returns Full verification URL with encoded access token as query parameter
   */
  public generateEmailVerificationLink(token: string) {
    this.logger.log(token, 'token for email verification');
    return `http://localhost:5173/verify-email?token=${token}`
  }


  /**
   * Sends a verification email to a newly registered user
   * @param email - Recipient's email address to send the verification to
   * @param name - Name of the user to personalize the email content
   * @param verificationLink - Unique URL for the user to confirm their email
   */
  public async sendVerificationEmail(email: string, name: string, verificationLink: string): Promise<string> {
    try {
      const htmlTemplate = this._readHtmlTemplate('verify-email');
      const variables: TemplateVariables = { name, verificationLink };
      const htmlContent = this.replaceTemplateVariables(htmlTemplate, variables);
      const messageInfo = await this.mailerService.sendMail({
        to: email,
        from: 'hwjza2qjhdyin2z5@ethereal.email',
        subject: 'Email Verification',
        html: htmlContent,
      });
      this.logger.log(messageInfo, 'messageInfo');
      return '';
    } catch (err) {
      throw err;
    }
  }

  /**
   * Reads HTML email template file from the templates directory
   * @param templateName - Name of the template file (without .html extension)
   * @returns Raw HTML string of the requested template file
   */
  private _readHtmlTemplate(templateName: string) {
    const templatePath = path.join(this.templatesDir, `${templateName}.hbs`);
    try {
      return fs.readFileSync(templatePath, 'utf-8');
    } catch (err) {
      throw new Error('Template not found');
    }
  }

  /**
   * Replaces placeholder variables in template string with actual values
   * @param template - Raw HTML template string containing {{variable}} placeholders
   * @param variables - Key-value pairs of variables to inject into the template
   * @returns Processed HTML string with all placeholders replaced
   */
  private replaceTemplateVariables(template: string, variables: TemplateVariables): string {
    let result = template;
    for (const [key, value] of Object.entries(variables)) {
      const placeholder = `{{${key}}}`;
      result = result.replace(new RegExp(placeholder, 'g'), value);
    }
    return result;
  }

}
