import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

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
    return (req: Request, res: Response, next: NextFunction) => {
      validateToken(req, (err) => {
        console.log(err);
        res.status(401).json({
          errors: {
            headers: `"authorization: ${req.headers.authorization}" is invalid.`
          }
        })
      });
      next();
    }
  } else {
    return (req: Request, _res: Response, next: NextFunction) => {
      validateToken(req, (err) => { });
      next();
    }
  }
}

function validateToken(
  req: Request,
  onError: (err: Error) => void,
): void {
  try {
    const token = getToken(req);
    const decodedToken = <any>verify(token, process.env.JWT_SECRET);
    req.locals = req.locals || {};
    req.locals.user = decodedToken;
  } catch (err) {
    onError(err);
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
