import { NextFunction, Response } from 'express';
import { inject, injectable } from 'inversify';

import { TYPES } from '../../../constants';
import {
  IErrorHttpResBody,
  IHttpResponse,
  IJwtSerializer,
  IUserHttpUnserializedResBody,
} from './interfaces';

@injectable()
export class SerializeMiddleware {
  constructor(
    @inject(TYPES.JwtCipher) private jwtSerializer: IJwtSerializer,
  ) { }

  setup(
    _req: unknown,
    res: IHttpResponse<IUserHttpUnserializedResBody | IErrorHttpResBody>,
    next: NextFunction,
  ): void {
  }
}
