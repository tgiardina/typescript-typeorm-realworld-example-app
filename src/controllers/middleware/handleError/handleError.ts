import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

import {
  HttpDuplicateError,
  HttpError,
  HttpErrorLocation,
  HttpUncaughtError,
} from '../../errors';

export function handleError(
  err: Error,
  _req: unknown,
  res: Response,
  _next: unknown
) {
  if (err instanceof HttpError) {
    res.status(err.status).json(err.toDto());
    // @ts-ignore
  } else if (err instanceof QueryFailedError && err.code === "ER_DUP_ENTRY") {
    const httpError = parseDuplicateError(err);
    res.status(httpError.status).json(httpError.toDto());
  } else {
    console.log(err);
    const httpError = new HttpUncaughtError();
    res.status(httpError.status).json(httpError.toDto());
  }
}

////////////////////////////////////////////////////////////////////////////////
// Helpers
////////////////////////////////////////////////////////////////////////////////

function parseDuplicateError(err: QueryFailedError): HttpError {
  const split = err.message.split("'");
  const column = split[3];
  const value = split[1];
  const message = `Instance with "${column}" = "${value}" already exists.`
  const httpError = new HttpDuplicateError();
  httpError.append(HttpErrorLocation.Body, message);
  return httpError;
}
