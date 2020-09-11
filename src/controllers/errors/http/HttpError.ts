export class HttpError extends Error {
  readonly status: number;
  private body: string[];

  constructor(status: number) {
    super();
    this.status = status;
    this.body = [];
  }

  append(message: string): void {
    this.body.push(message);
  }

  toDto(): { errors: Errors } | null {
    // I don't like this error structure. It's almost pointedly
    //   un-machine-readable. But it's specified by RealWorld: https://github.com/gothinkster/realworld/tree/master/api#errors-and-status-codes
    if (this.body.length) {
      return { errors: { body: this.body } };
    } else {
      return null;
    }
  }
}

////////////////////////////////////////////////////////////////////////////////
// Helpers
////////////////////////////////////////////////////////////////////////////////

interface Errors {
  body?: string[];
  server?: string[];
}
