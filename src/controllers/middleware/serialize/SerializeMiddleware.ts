import { NextFunction, Response } from 'express';
import { inject, injectable } from 'inversify';

import { TYPES } from '../../../constants';
import {
  IDecodedToken,
  IErrorHttpResBody,
  IHttpResponse,
  IJwtSerializer,
  IUserHttpResBody,
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
    const oldJson = res.json.bind(res);
    res.json = (data: IUserHttpUnserializedResBody) => {
      if (data.user) {
        const token = this.jwtSerializer.serialize({
          id: data.user.id,
          email: data.user.email,
          password: data.user.password,
        });
        oldJson({ user: { token, ...data.user } });
      } else {
        oldJson(data);
      }
    }
    next();
  }
}
