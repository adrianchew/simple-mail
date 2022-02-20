
import { UseCaseRequest } from '../../../core/common';

export interface SendEmailRequest extends UseCaseRequest {
  to: string[],
  from: string,
  cc?: string[],
  bcc?: string[],
  subject?: string,
  text?: string,
  html?: string
}
