import { Request, Response } from 'express';
import { body } from 'express-validator';
import { inject } from 'inversify';
import {
  controller,
  httpPost,
  interfaces,
} from 'inversify-express-utils';

import { TYPES } from '../../../constants/';
import {
  IDecodedToken,
  IErrorHttpResBody,
  IHttpResponse,
  IUserHttpPostReq,
  IUserRepository,
  IUserRo,
  IUserHttpUnserializedResBody,
  IVerifiedHttpReq,
} from './interfaces';
import { auth, validate } from '../../middleware';

@controller('')
export class UserController implements interfaces.Controller {
  constructor(
    @inject(TYPES.UserRepository) private repository: IUserRepository,
  ) { }

  @httpPost(
    '/users',
    body('email').isEmail(),
    body('password').isString(),
    body('username').isString(),
    validate,
  )
  public async create(req: Request, res: Response) {
    try {
      console.log(req.locals.user.id);
      const user: IUserRo = await this.repository.createAndSave({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
      });
      res.status(201).json({
        bio: user.bio,
        email: user.email,
        image: user.image,
        token: user.token,
        username: user.username,
      });
    } catch (err) {
      if (err.code === "ER_DUP_ENTRY") {
        res.status(409).json({
          errors: {
            body: [
              `409 - User "${req.body.username}" already exists.`,
            ]
          }
        });
      } else {
        console.log(err);
        res.status(500).json({
          errors: {
            body: [
              "500 - Server error"
            ],
          },
        });
      }
    }
  }
}
