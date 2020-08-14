import { inject } from 'inversify';
import { controller, httpGet, httpPost, interfaces, } from 'inversify-express-utils';

import { TYPES } from '../../../constants/';
import { IBaseRequest, IBaseResponse } from '../../interfaces';
import { IUserDto } from '../../../models';
import { IUserRepository } from "../../../repositories/user";

@controller("")
export class UserController implements interfaces.Controller {

  constructor(@inject(TYPES.UserRepository) private repository: IUserRepository) {
  }

  @httpPost("/users")
  public async create(
    req: IBaseRequest<string>,
    res: IBaseResponse<IUserDto | string>,
  ): Promise<void> {
    const username = req.body.username;
    if (!username) {
      res.status(400).json(`400 - Username "${username}" is invalid.`);
    }
    try {
      const result = await this.repository.create({username: req.body.username});
      res.status(201).json(result.toDto());
    } catch (e) {
      if (e === "ER_DUP_ENTRY") {
        res.status(409).json(`409 - User "${username}" already exists.`);
      } else {
        res.status(500).json("500 - Server error");
      }
    }
  }

  @httpGet("/user")
  public async getByAuth(
    req: IBaseRequest<void>,
    res: IBaseResponse<IUserDto | string>,
  ): Promise<void> {
    const id = req.locals && req.locals.user && req.locals.user.id;
    if (!id) res.status(401).json(`401 - Missing valid authorization.`);
    try {
      const result = await this.repository.findOne(id);
      res.status(200).json(result.toDto());
    } catch (e) {
      if (e == "ER_NOT_FOUND") {
        res.status(404).json(`404 - No user associated with token.`);
      } else {
        res.status(500).json("500 - Server error");
      }
    }
  }
}
