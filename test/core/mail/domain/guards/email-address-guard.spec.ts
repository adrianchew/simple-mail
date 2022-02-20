import { EmailAddressGuard } from '../../../../../src/core/mail/domain/guards/email-address-guard';
import { Result, Error } from '../../../../../src/core/common';

describe ("EmailAddressGuard", () => {

  it ("Should pass invalid email address test.", () => {
    const validEmail = 'marco.polo@email.com.my'

    let result = EmailAddressGuard.invalidEmailAddress(validEmail);
    expect (result.isOK).toEqual(true);
  })

  it ("Should fail invalid email address test.", () => {
    const gmail = 'marco.polo.gmail.com';
    const outlook = 'marco@{}+polo@outlook.com';

    let result = EmailAddressGuard.invalidEmailAddress(gmail);
    let error = <Error>result.error;
    expect (result.isOK).toEqual(false);
    expect (error.message).toEqual(`"${gmail}" is an invalid email address.`)

    result = EmailAddressGuard.invalidEmailAddress(outlook);
    error = <Error>result.error;
    expect (result.isOK).toEqual(false);
    expect (error.message).toEqual(`"${outlook}" is an invalid email address.`)
  })

  it ("Should pass all guard tests over a list of values.", () => {
    const validEmails = {
      to: 'marco.polo@gmail.com',
      from: 'marco+polo@outlook.com',
      cc: 'marco.polom@arcopolo.com',
      bcc: 'john.smith@johnsmith.com'  
    }

    const results = Array.from(Object.values(validEmails), 
                              (v) => EmailAddressGuard.invalidEmailAddress(v))

    const allOK = Result.isAllOk<string>(results)
    expect (allOK.isOK).toEqual(true)
  })

  it ("Should fail all guard tests over a list of values.", () => {
    const invalidEmails = {
      to: 'marco.pologmail.com',
      from: '[marco+polo]@',
      cc: 'marco.polo@marcopolo',
      bcc: '@johnsmith.com'  
    }

    const results = Array.from(Object.values(invalidEmails), 
                              (v) => EmailAddressGuard.invalidEmailAddress(v))
    
    const allOK = Result.isAllOk<string>(results)
    expect (allOK.isOK).toEqual(false)    
  })
})