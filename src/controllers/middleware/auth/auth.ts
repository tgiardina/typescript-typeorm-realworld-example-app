import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { HttpUnauthorizedError } from '../../errors';

export const auth = {
  /**
   * Reads errors from express-validator package, throwing appropriate
   *   HttpValidationError if there are erros and simply calling next if ther are
   *   none.
   * @module auth
   * @function
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @return {void}
   */
  required: getMiddleware(true),
  /**
   * Reads errors from express-validator package, throwing appropriate
   *   HttpValidationError if there are erros and simply calling next if ther are
   *   none.
   * @module auth
   * @function
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @return {void}
   */
  optional: getMiddleware(false),
};

////////////////////////////////////////////////////////////////////////////////
// Helpers
////////////////////////////////////////////////////////////////////////////////

function getMiddleware(
  isRequired: boolean
): (req: Request, res: Response, next: NextFunction) => void {
  if (isRequired) {
    return (req: Request, _res: Response, next: NextFunction) => {
      validateToken(req, (token) => {
        throw new HttpUnauthorizedError(token);
      });
      next();
    }
  } else {
    return (req: Request, _res: Response, next: NextFunction) => {
      validateToken(req, (_token) => { });
      next();
    }
  }
}

function validateToken(
  req: Request,
  onError: (token: string) => void,
): void {
  const token = getToken(req);
  try {
    const decodedToken = <any>verify(token, process.env.JWT_SECRET);
    req.locals = req.locals || {};
    req.locals.user = decodedToken;
  } catch (_err) {
    onError(token);
  }
}

function getToken(req: Request): string {
  const authorization = req.headers.authorization;
  if (!authorization) return;
  const authString = authorization.toString();
  const isToken = authString.split(' ')[0] === 'Token';
  const isBearer = authString.split(' ')[0] === 'Bearer';
  if (isToken || isBearer) {
    return authString.split(' ')[1];
  } else {
    return;
  }
}
