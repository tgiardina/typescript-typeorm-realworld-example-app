import { NextFunction } from 'express';

import { IUserDto } from '../../../models';
import { IBasicResponse, ITokenBearer } from './';

export class AuthMiddleware {
  constructor(
    private getToken: (req: ITokenBearer) => string,
    private verify: (token: string) => IUserDto,
  ) { }

  authenticate(
    req: ITokenBearer,
    res: IBasicResponse,
    next: NextFunction
  ): void {
    const token = this.getToken(req);
    try {
      res.locals.user = this.verify(token);
      next();
    } catch (err) {
      res.status(401).json("401 - Request is unauthorized.");
    }
  }
}
