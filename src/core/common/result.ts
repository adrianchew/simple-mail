
import { Error } from "./error";

interface ResultProps <T> {
  value?: T;
  error?: Error;
}

export class Result<T> {
  private _isOK: boolean;
  private _props: ResultProps<T>;

  constructor (isOK: boolean, props: ResultProps<T>) {
    this._isOK = isOK;
    this._props = props;
    Object.freeze(this);
  }

  get isOK(): boolean {
    return this._isOK;
  }

  get value(): T | undefined {
    return this._props.value;
  }

  get error(): Error | undefined {
    return this._props.error;
  }

  public static ok<U>(props: ResultProps<U>): Result<U> {
    return new Result<U>(true, props);
  }

  public static fail<U>(props: ResultProps<U>): Result<U> {
    return new Result<U>(false, props); 
  }

  public static isAllOk<U>(results: Result<U>[]) {
    const notOKs = results.filter((res) => {
      return (!res.isOK)
    }) 
    
    if (notOKs.length >= 1) {
      return Result.fail({
        error: {
          message : Array.from(notOKs, (res) => res.error?.message).join('\n')
        }
      })
    } else {
      return Result.ok({});
    } 
  }  
}
  