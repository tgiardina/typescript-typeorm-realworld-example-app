import { NextFunction } from 'express';
import { inject, injectable } from 'inversify';

import { TYPES } from '../../../constants';
import { IResponse, IJwtCipher } from './interfaces';

@injectable()
export class SerializeMiddleware {
  constructor(
    @inject(TYPES.JwtParser) private jwtParser: IJwtCipher,
  ) { }

  serialize(_req: unknown, res: IResponse, next: NextFunction): void { }
}
