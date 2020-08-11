import { inject } from 'inversify';
import {
  controller,
  interfaces,
  httpGet,
  httpPost,
} from 'inversify-express-utils';

import { TYPES } from '../constants/';
import { IBaseRequest, IBaseResponse } from './interfaces';
import { IUserDto } from '../models';
import { IUserService } from '../services';

@controller("")
export class UserController implements interfaces.Controller {

  constructor(@inject(TYPES.UserService) private service: IUserService) { }

  @httpPost("/users")
  public async create(
    req: IBaseRequest<string>,
    res: IBaseResponse<IUserDto | string>,
  ): Promise<void> {
    const data: IUserDto = { username: req.body.username };
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

  @httpGet("/user")
  public async getByAuth(
    req: IBaseRequest<void>,
    res: IBaseResponse<IUserDto | string>,
  ): Promise<void> {
    const data: IUserDto = req.locals.user;
    const result = await this.service.findById(data.id);
    if (result.isOk) {
      res.status(200).json(result.value);
    } else if (result.error == "ER_NOT_FOUND") {
      res.status(404).json(`404 - No user associated with token.`);
    } else {
      res.status(500).json("500 - Server error");
    }
  }
}
