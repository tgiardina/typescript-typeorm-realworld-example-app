import { HttpError } from './';

export class HttpUncaughtError extends HttpError {
  constructor() {
    super(500);
  }
}
