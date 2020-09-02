import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { HttpValidationError } from '../../errors';

export function validate(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const httpError = new HttpValidationError();
    for (const error of errors.array()) {
      const value = req[error.location][error.param];
      httpError.append(
        error.location,
        `"${error.param}: ${value}" throws ${error.msg.toLowerCase()}`,
      );
    }
    throw httpError;
  }
}

// I hate this error formatting. Is 422 really a better status than 400?
//   Why make it so pointedly un-machine-readable? But it's specified by
//   RealWorld: https://github.com/gothinkster/realworld/tree/master/api#errors-and-status-codes
