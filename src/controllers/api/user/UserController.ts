import { inject } from 'inversify';
import {
  controller,
  httpPost,
  interfaces,
} from 'inversify-express-utils';

import { TYPES } from '../../../constants/';
import { IUserRepository } from "./interfaces";

@controller("")
export class UserController implements interfaces.Controller {
  constructor(
    @inject(TYPES.UserRepository) private repository: IUserRepository,
  ) { }

  @httpPost("/users")
  public async create(
    req: IBodyRequest<IUserCreateDto>,
    res: IBodyResponse<{ user: IUserResponseDto } | string>,
  ): Promise<void> {
    const username = req.body.username;
    if (!username) {
      return res.status(400).json(`400 - Username "${username}" is invalid.`);
    }
    try {
      const user = await this.repository.createAndSaveDto({
        username: req.body.username
      });
      res.status(201).json({ user });
    } catch (err) {
      if (err.code === "ER_DUP_ENTRY") {
        res.status(409).json(`409 - User "${username}" already exists.`);
      } else {
        console.log(err);
        res.status(500).json("500 - Server error");
      }
    }
  }
}
