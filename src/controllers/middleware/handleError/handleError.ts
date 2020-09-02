import { Response } from 'express';

import { HttpError, HttpErrorLocation } from '../../errors';

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
    const httpError = new HttpError(500);
    httpError.append(HttpErrorLocation.Server, "Server Error");
    res.status(httpError.status).json(httpError.toDto());
  }
}
