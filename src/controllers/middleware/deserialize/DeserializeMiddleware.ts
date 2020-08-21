import { NextFunction } from 'express';
import { inject, injectable } from 'inversify';

import { TYPES } from '../../../constants';
import { IJwtDeserializer, IUserHttpGetReq, IVerifiedHttpReq } from './interfaces';

@injectable()
export class DeserializeMiddleware {
  constructor(
    @inject(TYPES.JwtParser) private jwtParser: IJwtDeserializer,
  ) { }

  deserialize(
    req: IUserHttpGetReq,
    _res: unknown,
    next: NextFunction
  ): void {
  }
}
