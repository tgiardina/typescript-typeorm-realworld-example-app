import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { HttpUnauthorizedError } from '../../errors';

export const auth = {
  /**
   * Verifies that the request header contains a valid token. If it does, 
   *   appends decoded token to req.locals.user and calls next. If it does not,
   *   throws an HttpUnauthorizedError.
   * @module auth
   * @function
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @return {void}
   */
  required: getMiddleware(true),
  /**
   * Checks if the request header contains a valid token. If it does, appends 
   *   token to req.locals.user then calls next. If not, calls next.
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
  onError: (token: string | null) => void,
): void {
  req.locals = req.locals || {};
  const token = getToken(req);
  if (!token) {
    onError(null);
  } else {
    try {
      req.locals.user = <any>verify(token, <string>process.env.JWT_SECRET)
    } catch (_err) {
      onError(token);
    }
  }
}

function getToken(req: Request): string | null {
  const authorization = req.headers.authorization;
  if (!authorization) return null;
  const authString = authorization.toString();
  const isToken = authString.split(' ')[0] === 'Token';
  const isBearer = authString.split(' ')[0] === 'Bearer';
  if (isToken || isBearer) {
    return authString.split(' ')[1];
  } else {
    return null;
  }
}
