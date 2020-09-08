import { HttpError } from './';

export class HttpUnauthorizedError extends HttpError {
  constructor() {
    super(401);
  }
}
