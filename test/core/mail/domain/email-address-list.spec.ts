import { EmailAddressList } from '../../../../src/core/mail/domain/email-address-list';

describe ("EmailAddressList", () => {

  it ("Should successfully create a email address list.", () => {
    const validEmails = {
      to: 'marco.polo@gmail.com',
      from: 'marco+polo@outlook.com',
      cc: 'marco.polom@arcopolo.com',
      bcc: 'john.smith@johnsmith.com'  
    }

    const values = Object.values(validEmails)
    const result = EmailAddressList.create(values)
    expect(result.isOK).toEqual(true);
  })

  it ("Should fail to create a email address list.", () => {
    const invalidEmails = {
      to: 'marco.polo@',
      from: '@outlook.com',
      cc: 'marco.polom@arcopolo',
      bcc: 'john@smith@johnsmith.com'  
    }

    const values = Object.values(invalidEmails);
    const result = EmailAddressList.create(values);
    expect(result.isOK).toEqual(false);
  })
})
