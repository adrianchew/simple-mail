import { Result, ValueObject } from '../../common';
import { EmailAddress } from '../../mail/domain/email-address';

interface EmailAddressListProps {
  value: EmailAddress[];
}

export class EmailAddressList extends ValueObject<EmailAddressListProps> {
  constructor (props: EmailAddressListProps) {
    super(props);
  }

  get value(): string[] {
    return Array.from(this.props.value, x => x.value)
  }

  public static create(addresses: string[]): Result<EmailAddressList> {
    const results = addresses.map(address => {
      return EmailAddress.create(address);
    });

    const validation = Result.isAllOk(results)

    return validation.isOK
      ? Result.ok<EmailAddressList>({
        value: new EmailAddressList({
          value: Array.from(results, x => <EmailAddress>x.value)
        })
      })
      : Result.fail({
        error: {
          message: <string>validation.error?.message
        } 
      })
  }
}
