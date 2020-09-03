import { HttpError, HttpErrorLocation } from './';

export class HttpUnauthorizedError extends HttpError {
  constructor(token: string) {
    super(401);
    if (token) {
      this.append(
        HttpErrorLocation.Headers,
        `Invalid token "${token}" provided`
      );
    } else {
      this.append(
        HttpErrorLocation.Headers,
        `No token provided.`
      );
    }
  }
}
