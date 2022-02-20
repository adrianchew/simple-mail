import { Result, ValueObject } from "../../common";
import { EmailAddressGuard } from './guards/email-address-guard';

interface EmailAddressProps {
  value: string;
}

export class EmailAddress extends ValueObject<EmailAddressProps> {
  constructor (props: EmailAddressProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create (address: string): Result<EmailAddress> {
    const validation = EmailAddressGuard.invalidEmailAddress(address);

    return validation.isOK
      ? Result.ok<EmailAddress>({value: new EmailAddress({ value: address})})
      : Result.fail<EmailAddress>({ 
          error: {
            message: `"${address}" is an invalid email address.`
          } 
        })
  }
}
