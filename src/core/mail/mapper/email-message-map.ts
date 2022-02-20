
import { EmailMessage, EmailMessageProps } from "../domain/email-message";
import { EmailAddress } from "../domain/email-address";
import { EmailAddressList } from "../domain/email-address-list";
import { SendEmailRequest } from "../usecase/send-email-request";
import { Result, Guard, Props } from "../../common";

export class EmailMessageMap {

  public static toDomain (req: SendEmailRequest): Result<EmailMessage>{
    let props: Props = {};

    const toResult = EmailAddressList.create(req.to);
    if (!toResult.isOK) {
      return Result.fail({
        error: {
          message: 'to: ' + <string>toResult.error?.message
        }
      })
    } else {
      props.to = <EmailAddressList>toResult.value
    }
    
    const fromResult = EmailAddress.create(req.from);
    if (!fromResult.isOK) {
      return Result.fail({
        error: {
          message: 'from: ' + <string>fromResult.error?.message
        }
      })
    } else {
      props.from = <EmailAddress>fromResult.value
    }

    if (Guard.notNullOrUndefined(req.cc, 'cc').isOK) {
      const ccResult = EmailAddressList.create(<string[]>req.cc);
      if (!ccResult.isOK) {
        return Result.fail({
          error: {
            message: 'cc: ' + <string>ccResult.error?.message
          }
        })
      } else {
        props.cc = <EmailAddressList>ccResult.value
      }
    }

    if (Guard.notNullOrUndefined(req.bcc, 'bcc').isOK) {
      const bccResult = EmailAddressList.create(<string[]>req.bcc);
      if (!bccResult.isOK) {
        return Result.fail({
          error: {
            message: 'bcc: ' + <string>bccResult.error?.message
          }
        })
      } else {
        props.bcc = <EmailAddressList>bccResult.value
      }
    }

    if (Guard.notNullOrUndefined(req.subject, 'subject').isOK) {
      props.subject = req.subject;
    }

    if (Guard.notNullOrUndefined(req.text, 'text').isOK) {
      props.text = req.text;
    }

    if (Guard.notNullOrUndefined(req.html, 'html').isOK) {
      props.html = req.html;
    }

    const message = EmailMessage.create(<EmailMessageProps>props)

    return Result.ok<EmailMessage>({value: message.value})
  }
}
