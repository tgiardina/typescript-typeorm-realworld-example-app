export class ServiceError extends Error {
  public code: string;

  constructor(code: string) {
    super();
    this.code = code;
  }
}
