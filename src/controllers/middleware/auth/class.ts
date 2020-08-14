import { NextFunction } from 'express';
import { inject, injectable } from 'inversify';

import { TYPES } from '../../../constants';
import { IBaseRequest } from '../../interfaces';
import { IJwtParser } from './interfaces';

@injectable()
export class AuthMiddleware {
  constructor(
    @inject(TYPES.JwtParser) private jwtParser: IJwtParser,
  ) { }

  parse(
    req: IBaseRequest,
    _res: {},
    next: NextFunction
  ): void {
    const token = this.getToken(req);
    try {
      req.locals = req.locals || {};
      req.locals.user = this.jwtParser.verify(token);
    } catch (err) {
      // TOOD: Add logging
    }
    next();
  }

  private getToken(req: IBaseRequest): string {
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
