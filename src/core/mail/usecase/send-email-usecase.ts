import { UseCase, UseCaseResponse, Result } from '../../common';
import { SendEmailRequest } from './send-email-request';
import { EmailMessageMap } from '../mapper/email-message-map';
import { EmailService } from '../service/email-service';
import { EmailMessage } from '../domain/email-message';

export class SendEmailUseCase implements UseCase<SendEmailRequest, Result<UseCaseResponse>> { 
  private _emailService: EmailService;

  public constructor(emailGateway: EmailService) {
    this._emailService = emailGateway;
  }

  public async execute(request: SendEmailRequest): Promise<Result<UseCaseResponse>> {
    try {
      const mapResult = EmailMessageMap.toDomain(request);
      if (!mapResult.isOK) {
        return Result.fail({
          error: {
            message: 'Failed to map request to EmailMessage domain object.\n' + 
                      mapResult.error?.message
          }
        })
      }

      const svcResult = await this._emailService.sendMail(<EmailMessage>mapResult.value);
      if (!svcResult.isOK) {
        return Result.fail({
          error: {
            message: 'Error encounter when sending message.\n' +
                      svcResult.error?.message
          }
        })
      } else {
        return Result.ok<UseCaseResponse>({ value: svcResult.value })
      }
    } catch {
      return Result.fail({
        error: {
          message: 'Unexpected error encountered when sending email!\n' + 'Request:\n' +
                    JSON.stringify(request)
        }
      })
    }
  }
}
