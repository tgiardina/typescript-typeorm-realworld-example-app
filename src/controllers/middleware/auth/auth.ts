import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { getManager } from "typeorm";

import { HttpUnauthorizedError } from '../../errors';
import { IDecodedToken } from '../../interfaces';

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
  return async (req: Request, _res: Response, next: NextFunction) => {
    const token = getToken(req);
    if (!token) {
      if (isRequired) {
        return next(new HttpUnauthorizedError());
      } else {
        return next();
      }
    }
    const user = <IDecodedToken>verify(token, <string>process.env.JWT_SECRET);
    const userExists = Object.values((await getManager().query(
      `SELECT EXISTS(SELECT 1 FROM user WHERE id = ${user.id});`
    ))[0])[0] == "1";
    if (!userExists) {
      return next(new HttpUnauthorizedError());
    }
    req.locals = req.locals || {};
    req.locals.user = user;
    return next();
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
