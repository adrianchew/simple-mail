import { nanoid } from 'nanoid';
import { Request, Response } from 'express';
import { Controller, Post } from '../common';
import { SimpleLogger } from '../../infra/logging/logger';
import { EmailGateway } from '../../infra/email/email-gateway';
import { SendEmailUseCase } from '../../core/mail/usecase/send-email-usecase';

const logger = new SimpleLogger();
const emailGateway = new EmailGateway();
const sendEmailUseCase = new SendEmailUseCase(emailGateway);

@Controller('/mail')
export default class MailController {

  @Post('/send')
  public async sendMail(req: Request, res: Response): Promise<any> {
    const requestID = nanoid();
    logger.info(`[${requestID}] POST - /mail/send`)
    logger.info(`[${requestID}] - ` + req.body);

    logger.info(`[${requestID}] - Sending email...`)
    const result = await sendEmailUseCase.execute(req.body); 

    if (!result.isOK) {
      logger.error(`[${requestID}] - ` + result.error?.message)
      res.status(500).send(result.error?.message);
    } else {
      logger.info(`[${requestID}] - Email successfully sent.`)
      res.status(200).send(result.value);
    }
  };
}
