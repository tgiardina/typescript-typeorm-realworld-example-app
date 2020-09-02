import { HttpError, HttpErrorLocation } from './';

export class HttpUncaughtError extends HttpError {
  constructor() {
    super(500);
    this.append(HttpErrorLocation.Server, "Server Error");
  }
}
