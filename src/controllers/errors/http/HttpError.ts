import { HttpErrorLocation } from './';

export class HttpError extends Error {
  readonly status: number;
  private errors: Errors;

  constructor(status: number) {
    super();
    this.status = status;
    this.errors = {};
  }

  append(location: HttpErrorLocation | string, message: string) {
    if (!this.errors[location]) this.errors[location] = [];
    this.errors[location].push(message);
  }

  toDto(): { errors: Errors } {
    return { errors: this.errors };
  }
}

////////////////////////////////////////////////////////////////////////////////
// Helpers
////////////////////////////////////////////////////////////////////////////////

interface Errors {
  body?: string[];
  server?: string[];
}
