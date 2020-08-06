import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, interfaces, httpPost } from 'inversify-express-utils';

import { TYPES } from '../constants/';
import { IUserModel } from '../models';
import { IUserService } from '../services';

@controller("/users")
export class UserController implements interfaces.Controller {

  constructor(@inject(TYPES.UserService) private service: IUserService) { }

  @httpPost("/")
  public async create(req: Request, res: Response) {
    const data: IUserModel = req.body;
    const result = await this.service.create(data);
    if (result.isOk) {
      res.status(201).json(result.value);
    } else if (result.error == "ER_NO_DEFAULT_FOR_FIELD") {
      res.status(400).json(`400 - Username "${data.username}" is invalid.`);
    } else if (result.error == "ER_DUP_ENTRY") {
      res.status(409).json(`409 - User "${data.username}" already exists.`);
    } else {
      res.status(500).json("500 - Server error");
    }
  }
}
