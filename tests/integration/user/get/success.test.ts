import { assert, request } from 'chai';
import { Application } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { Connection } from 'typeorm';

import initApp from '../../../../src/app';
import { IToken, IUser } from '../interfaces';
import initLoaders from '../../../loaders';
import { initConnection } from '../../../utils';

initLoaders();

describe('GET /api/user - success', () => {
  const data = {
    email: "username@example.com",
    password: "password",
    username: "username",
  };
  const token = sign({
    id: 1,
    email: data.email,
    password: data.password,
  }, process.env.JWT_SECRET);
  let app: Application;
  let body: IUser;
  let connection: Connection;
  let status: number;

  before(async () => {
    app = await initApp();
    connection = await initConnection();
    await connection.manager.query(
      `INSERT INTO user VALUES(\n\
        DEFAULT,\n\
        DEFAULT,\n\
        "${data.email}",\n\
        DEFAULT,\n\
        "${data.password}",\n\
        "user",\n\
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
      .get('/api/user')
      .set('Authorization', `Token ${token}`)
      .end((_err, res) => {
        status = res.status;
        body = res.body.user;
        done();
      });
  });

  it('should have 200 status', () => {
    assert.equal(status, 200);
  });

  it('should have correct body', () => {
    assert.equal(body.user.email, data.email);
    assert.equal(body.user.username, data.username);
  });

  it('should have correct token in body', () => {
    const deserialized = <IToken>verify(
      body.user.token,
      process.env.JWT_SECRET,
    );
    assert.equal(deserialized.id, 1);
    assert.equal(deserialized.email, data.email);
    assert.equal(deserialized.password, data.password);
  });
})  
