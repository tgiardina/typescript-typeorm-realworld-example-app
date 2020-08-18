import { inject } from 'inversify';
import { controller, httpGet, httpPost, interfaces, } from 'inversify-express-utils';

import { TYPES } from '../../../constants/';
import {
  IBaseRequest,
  IBodyRequest,
  IBodyResponse,
  IUserCreateDto,
  IUserResponseDto,
} from '../../interfaces';
import { IUserRepository } from "./interfaces";

@controller("")
export class UserController implements interfaces.Controller {

  constructor(@inject(TYPES.UserRepository) private repository: IUserRepository) {
  }

  @httpPost("/users")
  public async create(
    req: IBodyRequest<IUserCreateDto>,
    res: IBodyResponse<IUserResponseDto | string>,
  ): Promise<void> {
    const username = req.body.username;
    if (!username) {
      res.status(400).json(`400 - Username "${username}" is invalid.`);
    }
    try {
      const result = await this.repository.createAndSaveDto({
        username: req.body.username
      });
      res.status(201).json(result);
    } catch (err) {
      if (err.code === "ER_DUP_ENTRY") {
        res.status(409).json(`409 - User "${username}" already exists.`);
      } else {
        res.status(500).json("500 - Server error");
      }
    }
  }

  @httpGet("/user")
  public async getByAuth(
    req: IBaseRequest,
    res: IBodyResponse<IUserResponseDto | string>,
  ): Promise<void> {
    const id = req.locals && req.locals.user && req.locals.user.id;
    if (!id) res.status(401).json(`401 - Missing valid authorization.`);
    try {
      const result = await this.repository.findOneDto(id);
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json(`404 - No user associated with token.`);
      }
    } catch (err) {
      res.status(500).json("500 - Server error");
    }
  }
}
