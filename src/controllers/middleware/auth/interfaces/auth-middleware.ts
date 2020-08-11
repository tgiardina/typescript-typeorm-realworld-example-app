import { NextFunction } from 'express';

import { ITokenBearer } from './';
import { IBaseResponse } from '../../../interfaces';

export interface IAuthMiddleware {
  parse: (
    req: ITokenBearer,
    res: IBaseResponse,
    next: NextFunction
  ) => void;
}
