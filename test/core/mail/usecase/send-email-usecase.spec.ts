
import { Result } from '../../../../src/core/common';
import { EmailService } from '../../../../src/core/mail/service/email-service'
import { EmailMessage } from '../../../../src/core/mail/domain/email-message';
import { SendEmailUseCase } from '../../../../src/core/mail/usecase/send-email-usecase';

class EmailGateway implements EmailService {
  public async sendMail(email: EmailMessage): Promise<Result<string>> {
    return Result.ok({value: 'Email successfully sent!'});
  }
}

describe ("SendEmailUseCase", () => {

  it ("Should successfully execute SendEmailUseCase.", async () => {
    const validEmail = {
      to: ['marco.polo@gmail.com', 'john.smith@outlook.com', 'jane.doe@yahoo.com'],
      from: 'tom@jerry.com',
      cc: ['marco.polo@gmail.com', 'john.smith@outlook.com'],
      bcc: ['marco.polo@gmail.com', 'john.smith@outlook.com'],
      subject: 'A wonderful holiday!',
      text: 'Trip to hawaii 2022',
      html: '<H1>Happy holidays!</H1>'
    }

    const useCase = new SendEmailUseCase(new EmailGateway())
    const useResult = await useCase.execute(validEmail)
    expect(useResult.isOK).toEqual(true);
  })

  it ("Should failed to complete execution of SendEmailUseCase.", async () => {
    const validEmail = {
      to: ['marco.pologmail.com', 'john@smith@outlook.com', 'jane.doe@yahoo.com'],
      from: 'tom@jerry.com',
      subject: 'A wonderful holiday!',
      text: 'Trip to hawaii 2022',
      html: '<H1>Happy holidays!</H1>'
    }

    const useCase = new SendEmailUseCase(new EmailGateway())
    const useResult = await useCase.execute(validEmail)
    expect(useResult.isOK).toEqual(false);
  })

})