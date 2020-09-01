import { NextFunction, Request } from 'express';
import { inject, injectable } from 'inversify';

import { TYPES } from '../../../constants';
import { IJwtDeserializer } from './interfaces';

@injectable()
export class DeserializeMiddleware {
  constructor(
    @inject(TYPES.JwtParser) private jwtParser: IJwtDeserializer,
  ) { }

  setup(
    req: Request,
    _res: unknown,
    next: NextFunction
  ): void {
    Object.assign(req, this.deserialize(req));
    next();
  }

  private deserialize(req: Request): Request {
    const token = this.getToken(req);
    try {
      const decodedToken = this.jwtParser.deserialize(token);
      req.locals = req.locals || {};
      req.locals.user = decodedToken;
    } catch (_err) {
      // Nothing to do.
    }
    return req;
  }

  private getToken(req: Request): string {
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
}
