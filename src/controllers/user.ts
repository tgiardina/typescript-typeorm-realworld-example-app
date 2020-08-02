import { Application, Request, Response } from 'express';

import { IUser, IUserService } from '../interfaces';
import { UserModel } from '../models';
import { UserService } from '../services';
import { TYPES } from '../constants/';

export default function init(server: Application, service: IUserService): void {
  server.post("/users", async (req: Request, res: Response) => {
    const data: IUser = req.body;
    const result = await service.create(data);
    if (result.isOk) {
      res.status(201).json(result.value);
    } else if (result.error == "ER_NO_DEFAULT_FOR_FIELD") {
      res.status(400).json(`400 - Username "${data.username}" is invalid.`);
    } else if (result.error == "ER_DUP_ENTRY") {
      res.status(409).json(`409 - User "${data.username}" already exists.`);
    } else {
      console.log(result);
      res.status(500).json("500 - Server error");
    }
  });
}
