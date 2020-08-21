import { NextFunction } from 'express';
import { inject, injectable } from 'inversify';

import { TYPES } from '../../../constants';
import { IJwtDeserializer, IUserHttpGetReq, IVerifiedHttpReq } from './interfaces';

@injectable()
export class DeserializeMiddleware {
  constructor(
    @inject(TYPES.JwtParser) private jwtParser: IJwtDeserializer,
  ) { }

  setup(
    req: IUserHttpGetReq,
    _res: unknown,
    next: NextFunction
  ): void {
    Object.assign(req, this.deserialize(req));
    next();
  }

  private deserialize(
    serializedReq: IUserHttpGetReq,
  ): IVerifiedHttpReq<IUserHttpGetReq> {
    const token = this.getToken(serializedReq);
    try {
      return {
        ...serializedReq,
        locals: {
          user: this.jwtParser.deserialize(token)
        }
      }
    } catch (_err) {
      return {
        ...serializedReq,
        locals: {
          user: null,
        },
      }
    }
  }

  private getToken(req: IUserHttpGetReq): string {
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
