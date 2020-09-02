import { Response } from 'express';

import { HttpError, HttpUncaughtError } from '../../errors';

export function handleError(
  err: HttpError | Error,
  _req: unknown,
  res: Response,
  _next: unknown
) {
  if (err instanceof HttpError) {
    res.status(err.status).json(err.toDto())
  } else {
    console.log(err);
    const httpError = new HttpUncaughtError();
    res.status(httpError.status).json(httpError.toDto());
  }
}
