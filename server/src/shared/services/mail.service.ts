import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import * as fs from 'fs';
import * as path from 'path';

const resend = new Resend(process.env['RESEND_API']);

type SendMail = {
  emailId: string;
  subject: string;
  template: string;
};

type TemplateVariables = {
  [key: string]: string;
};

@Injectable()
export class MailService {

  private readonly templatesDir = path.join(__dirname, '../templates');


  public sendVerificationEmail(email:string ,name: string,verificationLink: string) {
    const htmlTemplate = this._readHtmlTemplate('verify-email');
    const variables: TemplateVariables = { name, verificationLink}
    const htmlContent = this.replaceTemplateVariables(htmlTemplate,{name,verificationLink});
    
    return resend.emails.send({
      from: 'nikhilpops@gmail.com',
      to: email,
      
    })

  }

  public resetPasswordEmail() {

  }

  private _readHtmlTemplate(templateName: string) {
      const templatePath = path.join(this.templatesDir, `${templateName}.html`);
      try {
        return fs.readFileSync(templatePath,'utf-8');
      }catch(err){
        throw new Error('Template not found');
      }
  }

 private replaceTemplateVariables(template: string, variables: TemplateVariables): string {
    let result = template;
    for (const [key, value] of Object.entries(variables)) {
      const placeholder = `{{${key}}}`;
      result = result.replace(new RegExp(placeholder, 'g'), value);
    }
    return result;
  }

}
