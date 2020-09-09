import { Request, Response } from 'express';
import { body } from 'express-validator';
import { inject } from 'inversify';
import {
  controller,
  httpPost,
  interfaces,
} from 'inversify-express-utils';

import { TYPES } from '../../../constants/';
import { IUserRepository } from './interfaces';
import { validate } from '../../middleware';

@controller('/api')
export class UserController implements interfaces.Controller {
  constructor(
    @inject(TYPES.UserRepository) private repository: IUserRepository,
  ) { }

  @httpPost(
    '/users',
    body('user.email').isEmail(),
    body('user.password').isString(),
    body('user.username').isString(),
    validate,
  )
  public async create(req: Request, res: Response) {
    const user = await this.repository.createAndSaveAuth({
      email: req.body.user.email,
      password: req.body.user.password,
      username: req.body.user.username,
    });
    res.status(201).json({
      user: {
        bio: user.bio || "",
        email: user.email,
        image: user.image || "", // As specified by swagger.json
        token: user.token,
        username: user.username,
      },
    });
  }
}
