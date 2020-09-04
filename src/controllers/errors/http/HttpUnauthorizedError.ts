import { HttpError } from './';

export class HttpUnauthorizedError extends HttpError {
  constructor(token: string) {
    super(401);
    if (token) {
      this.append(`Invalid token "${token}" provided`);
    } else {
      this.append(`No token provided.`);
    }
  }
}
