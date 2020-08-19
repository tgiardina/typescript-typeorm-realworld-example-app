import { assert, request } from 'chai';
import { Application } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { Connection } from 'typeorm';

import initApp from '../../../src/app';
import initLoaders from '../../loaders';
import { initConnection } from '../../utils';

initLoaders();

describe('/GET user', () => {
  const username = "username";
  const token = sign({ id: 1, username }, process.env.JWT_SECRET);
  let app: Application;
  let connection: Connection;
  let user: { [username: string]: string };
  let status: number;

  before(async () => {
    app = await initApp();
    connection = await initConnection();
    await connection.manager.query(
      `INSERT INTO user VALUES(\n\
        DEFAULT,\n\
        DEFAULT,\n\
        DEFAULT,\n\
        "${username}",\n\
        DEFAULT,\n\
        DEFAULT\n\
       );`
    );
  });

  after(async () => {
    await connection.close();
  });

  it('should run', (done) => {
    request(app)
      .get('/user')
      .set('Authorization', `Token ${token}`)
      .end((_err, res) => {
        status = res.status;
        user = res.body.user;
        done();
      });
  });

  it('should have 200 status', () => {
    assert.equal(status, 200);
  });

  it('should have correct username in body', () => {
    assert.equal(user.username, username);
  });

  it('should have correct token in body', () => {
    const deserialized = <{ [key: string]: unknown }>verify(
      user.token,
      process.env.JWT_SECRET,
    );
    assert.equal(deserialized.id, 1);
    assert.equal(deserialized.username, username);
  });
})  
