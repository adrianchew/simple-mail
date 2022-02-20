import { Props, Result, Entity, UniqueIdentifier} from '../../common'; 
import { EmailAddress } from './email-address';
import { EmailAddressList } from './email-address-list';

export interface EmailMessageProps extends Props{
  to: EmailAddressList;
  from: EmailAddress;
  cc?: EmailAddressList;
  bcc?: EmailAddressList;
  subject?: string;
  text?: string;
  html?: string;
}

export class EmailMessage extends Entity<EmailMessageProps> {
  get to(): string[] {
    return this._props.to.value;
  }

  get from(): string {
    return this._props.from.value;
  }

  get cc(): string[] | undefined {
    return this._props.cc?.value;
  }

  get bcc(): string[] | undefined {
    return this._props.bcc?.value;
  }

  get subject(): string | undefined {
    return this._props.subject;
  }

  get text(): string | undefined {
    return this._props.text;
  }

  get html(): string | undefined {
    return this._props.text;
  }

  public static create(props: EmailMessageProps, id?: UniqueIdentifier): Result<EmailMessage> {
    const emailMessage = new EmailMessage(props, id);
    return Result.ok({ value: emailMessage }) ;
  }
}
