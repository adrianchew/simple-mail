import Validator from "validator";
import { Guard, Result } from "../../../common";

export class EmailAddressGuard extends Guard {
  public static invalidEmailAddress(value: string, key?: string): Result<string> {
    return Validator.isEmail(value)
      ? Result.ok<string>({ value: value })
      : Result.fail({
        error: 
        {
          message: `"${value}" is an invalid email address.` 
        }
      })
  }
}