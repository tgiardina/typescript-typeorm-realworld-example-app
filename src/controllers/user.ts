import { Application }   from 'express';
import { getConnection } from'typeorm';

import { createUser } from '../services';

export default function init(server: Application): void {
  server.post("/users", async (req, res) => {
    const username = req.body.username;
    const result = await createUser(username);
    if(result.isSuccess) {
      res.json(result.getValue());
    } else if(result.error == "ER_DUP_ENTRY") {
      res.status(409).json(`409 - User "${username}" already exists`);      
    } else {
      res.status(500).json("500 - Server error");      
    }
  });
}
