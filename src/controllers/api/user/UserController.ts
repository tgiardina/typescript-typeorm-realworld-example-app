import { Request, Response } from 'express';
import { inject } from 'inversify';
import {
  controller,
  httpPost,
  interfaces,
} from 'inversify-express-utils';

import { TYPES } from '../../../constants/';
import {
  IErrorHttpResBody,
  IHttpResponse,
  IUserHttpPostReq,
  IUserRepository,
  IUserRo,
  IUserHttpUnserializedResBody,
  IVerifiedHttpReq,
} from "./interfaces";

@controller("")
export class UserController implements interfaces.Controller {
  constructor(
    @inject(TYPES.UserRepository) private repository: IUserRepository,
  ) { }

  @httpPost("/users")
  public async create(
    req: Request,
    res: IHttpResponse<IUserHttpUnserializedResBody | IErrorHttpResBody>,
  ): Promise<void> {
    // Validate.
    console.log(req.locals);
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    if (!email || !password || !username) {
      res.status(400).json({
        errors: {
          body: [
            `400 - Username "${username}" is invalid.`
          ],
        }
      });
      return;
    }
    // Respond.
    try {
      const user: IUserRo = await this.repository.createAndSave({
        email,
        password,
        username,
      });
      res.status(201).json({ user });
    } catch (err) {
      if (err.code === "ER_DUP_ENTRY") {
        res.status(409).json({
          errors: {
            body: [
              `409 - User "${username}" already exists.`,
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
