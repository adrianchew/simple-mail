import { Result } from './result';

export class Guard {
  public static notNullOrUndefined(value: any, key: string): Result<any> {
    return typeof(value) != 'undefined' && value != null
      ? Result.ok({})
      : Result.fail({
        error: 
        {
          message: `"${key}" is null or undefined.` 
        }
      })
  } 
}
