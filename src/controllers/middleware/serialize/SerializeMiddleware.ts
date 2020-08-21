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
    res.json = (data: IDecodedToken) => {
      this.serialize(oldJson, data);
    }
    next();
  }

  private serialize(
    jsonSerializer: (data: IDecodedToken) => void,
    data: IHttpResponse<IUserHttpUnserializedResBody>,
  ): void {
    const tokenizedData = this.tokenize(data);
    jsonSerializer(tokenizedData);
  }

  private tokenize(
    untokenizedRes: IHttpResponse<IUserHttpUnserializedResBody>,
  ): IHttpResponse<IUserHttpResBody> {
    const tokenizedRes: IHttpResponse<IUserHttpResBody> = untokenizedRes;
    if (untokenizedRes.user) {
      untokenizedRes.user.token =
        this.jwtSerializer.serialize(untokenizedRes.user);
    }
    return tokenizedRes;
  }
}
