import { NextFunction } from 'express';
import { inject, injectable } from 'inversify';

import { TYPES } from '../../../constants';
import { IDto, IJwtCipher, IResponse } from './interfaces';

@injectable()
export class SerializeMiddleware {
  constructor(
    @inject(TYPES.JwtCipher) private jwtCipher: IJwtCipher,
  ) { }

  setup(_req: unknown, res: IResponse, next: NextFunction): void {
    const oldJson = res.json.bind(res);
    res.json = (data: IDto) => this.serialize(oldJson, data);
    next();
  }

  private serialize(
    jsonSerializer: (data: unknown) => void,
    data: IDto,
  ): void {
    if (data.user) {
      data.user.token = this.jwtCipher.serialize(data.user);
    }
    jsonSerializer(data);
  }
}
