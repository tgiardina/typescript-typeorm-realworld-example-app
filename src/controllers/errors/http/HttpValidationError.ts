import { HttpError } from './';

export class HttpValidationError extends HttpError {
  constructor() {
    // I don't like this error code. Why not 400? But it's specified by RealWorld: https://github.com/gothinkster/realworld/tree/master/api#errors-and-status-codes    
    super(422);
  }
}
