import { Guard } from '../../../src/core/common/guard';
import { Error } from '../../../src/core/common/error'

describe ("Guard", () => {

  it ("Should pass Null or Undefined test.", () => {
    const name = 'Marco Polo';
    
    let result = Guard.notNullOrUndefined(name, 'name');
    expect(result.isOK).toEqual(true);
  })

  it ("Should fail Null and Undefined test.", () => {
    const email = undefined;
    const phone = null;   

    let result = Guard.notNullOrUndefined(email,'email');
    let error = <Error>result.error;
    expect (result.isOK).toEqual(false);
    expect (error.message).toEqual('"email" is null or undefined.');

    result = Guard.notNullOrUndefined(phone, 'phone');
    error = <Error>result.error;
    expect (result.isOK).toEqual(false);
    expect (error.message).toEqual('"phone" is null or undefined.');
  })
})
