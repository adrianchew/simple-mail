import { BaseError } from "src/core/common/error";

export class InvalidEmailAddress extends BaseError {
  constructor (email: string) {
    super(`Invalid email address! email=${email}`);
  }
}
