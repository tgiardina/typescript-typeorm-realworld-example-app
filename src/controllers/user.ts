import { Application, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { IUserData } from '../interfaces';
import { UserModel } from '../models';
import { UserService } from '../services';

export default function init(server: Application): void {
  server.post("/users", async (req: Request, res: Response) => {
    const data: IUserData = req.body;
    const userService = new UserService(getRepository(UserModel));
    const result = await userService.create(data);
    if (result.isOk) {
      res.status(201).json(result.value);
    } else if (result.error == "ER_NO_DEFAULT_FOR_FIELD") {
      res.status(400).json(`400 - Username "${data.username}" is invalid.`);
    } else if (result.error == "ER_DUP_ENTRY") {
      res.status(409).json(`409 - User "${data.username}" already exists.`);
    } else {
      res.status(500).json("500 - Server error");
    }
  });
}
