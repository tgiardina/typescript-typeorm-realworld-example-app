import { HttpError } from './';

export class HttpValidationError extends HttpError {
  constructor() {
    super(422);
  }
}
