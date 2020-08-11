import { NextFunction } from 'express';

export interface IAuthMiddleware {
  authenticate: (
    req: ITokenBearer,
    res: IBasicResponse,
    next: NextFunction
  ) => void;
}
