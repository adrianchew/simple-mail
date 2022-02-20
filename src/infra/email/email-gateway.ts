import NodeMailer from 'nodemailer';

import { Result } from '../../core/common';
import { EmailMessage } from '../../core/mail/domain/email-message';
import { EmailService } from '../../core/mail/service/email-service'; 

import emailConfig from '../../../mail.config'
import e from 'express';


export class EmailGateway implements EmailService {
  private _transport;

  public constructor () {
    this._transport = this.setup()
  }

  private setup() {
    const transport = NodeMailer.createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: emailConfig.auth.user,
        serviceClient: emailConfig.auth.client_id,
        privateKey: emailConfig.auth.private_key      
      }
    }) 
    return transport;
  }

  private async verify() {
    await this._transport.verify
  }

  public async sendMail(email: EmailMessage): Promise<Result<string>> {
    try {
      await this._transport.sendMail({
        from: email.from,
        to: email.to,
        cc: email.cc,
        bcc: email.bcc,
        subject: email.subject,
        text: email.text,
        html: email.html
      })
    
      return Result.ok({value: 'Email successfully sent!'});
    } catch {
      return Result.fail({
        error: {
          message: 'Email gateway error!'
        }
      })
    }
  }
}

