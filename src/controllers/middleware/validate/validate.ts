import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export function validate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const errorsDict = {};
    for (const error of errors.array()) {
      const value = req[error.location][error.param];
      errorsDict[error.location] = errorsDict[error.location] || [];
      errorsDict[error.location].push(
        `"${error.param}: ${value}" throws ${error.msg.toLowerCase()}`
      );
    }
    // I hate this error formatting. Is 422 really a better status than 400?
    //   Why make it so pointedly un-machine-readable? But it's specified by
    //   RealWorld: https://github.com/gothinkster/realworld/tree/master/api#errors-and-status-codes
    res.status(422).json({
      errors: errorsDict,
    });
  }
}
