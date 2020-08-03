/**
 * @ref https://khalilstemmler.com/articles/enterprise-typescript-nodejs/handling-errors-result-class/
 */
export class Result<T> {
  public isOk: boolean;
  private _error: string;
  private _value: T;

  private constructor(isOk: boolean, error?: string, value?: T) {
    if (isOk && error) {
      throw new Error(`InvalidOperation: A result cannot be 
        successful and contain an error`);
    }
    if (!isOk && !error) {
      throw new Error(`InvalidOperation: A failing result 
        needs to contain an error message`);
    }

    this.isOk = isOk;
    this._error = error;
    this._value = value;

    Object.freeze(this);
  }

  public get error(): string {
    if (this.isOk) {
      throw new Error("Can't retrieve error from a successful result.");
    }
    return this._error;
  }

  public get value(): T {
    if (!this.isOk) {
      throw new Error("Can't retrieve value from a failed result.");
    }
    return this._value;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, null, value);
  }

  public static fail<U>(error: string): Result<U> {
    return new Result<U>(false, error);
  }
}
