import { Application }   from 'express';
import { getConnection } from'typeorm';

import { createUser } from '../services';

export default function init(server: Application): void {
  server.post("/users", async (req, res) => {
    const username = req.body.username;
    res.json(await createUser(username));
  });
}
