
export interface Error {
  message: string;
}

export abstract class BaseError {
  public readonly message: String;

  constructor (message: string) {
    this.message = message;
  };
}
