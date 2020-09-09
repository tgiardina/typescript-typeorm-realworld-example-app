import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { HttpValidationError } from '../../errors';

/**
 * Reads errors from express-validator package, throwing appropriate
 *   HttpValidationError if there are erros and simply calling next if ther are
 *   none.
 * @module validate
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {void}
 */
export function validate(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const httpError = new HttpValidationError();
    for (const error of errors.array()) {
      const value = req[<string>error.location][error.param];
      httpError.append(
        `"${error.param}: ${value}" throws ${error.msg.toLowerCase()}`,
      );
    }
    throw httpError;
  }
}
