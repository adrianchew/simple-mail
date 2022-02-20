
import { Result } from '../../common'
import { EmailMessage } from "../domain/email-message";

export interface EmailService {
  sendMail(message: EmailMessage): Promise<Result<string>>;
}
