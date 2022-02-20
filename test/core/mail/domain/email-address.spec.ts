import { EmailAddress } from '../../../../src/core/mail/domain/email-address';

describe ("EmailAddress", () => {

  it ("Should successfully create an email address.", () => {
    const validEmail = 'marco.polo@gmail.com';

    const result = EmailAddress.create(validEmail)
    expect(result.isOK).toEqual(true);
    expect(result.value?.value).toEqual(validEmail)
  })

  it ("Should failed to create email address.", () => {
    const validEmail = '@gmail.com';

    const result = EmailAddress.create(validEmail)
    expect(result.isOK).toEqual(false);
  })
})
