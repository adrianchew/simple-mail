import { EmailMessageMap } from '../../../../src/core/mail/mapper/email-message-map';

describe ("EmailMessageMap", () => {

  it ("Should successfully create an EmailMessage object from a request.", () => {
    const validEmail = {
      to: ['marco.polo@gmail.com', 'john.smith@outlook.com', 'jane.doe@yahoo.com'],
      from: 'tom@jerry.com',
      cc: ['marco.polo@gmail.com', 'john.smith@outlook.com'],
      bcc: ['marco.polo@gmail.com', 'john.smith@outlook.com'],
      subject: 'A wonderful holiday!',
      text: 'Trip to hawaii 2022',
      html: '<H1>Happy holidays!</H1>'
    }

    const result = EmailMessageMap.toDomain(validEmail);
    expect(result.isOK).toEqual(true);
  })
})