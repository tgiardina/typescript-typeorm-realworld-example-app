import { NextFunction, Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

import {
  HttpDuplicateError,
  HttpError,
  HttpUncaughtError,
} from '../../errors';

/**
 * Catches all thrown errors, logs them if needed, and then sends the 
 *   appropriate resopnse.
 * @module handlError
 * @function
 * @param {Object} err - Express err object
 * @param {Object} _req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} _next - Express next middleware function
 * @return {void}
 */
export function handleError(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
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
  httpError.append(message);
  return httpError;
}
