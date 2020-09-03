import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { HttpUnauthorizedError } from '../../errors';

export const auth = {
  required: getMiddleware(true),
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
