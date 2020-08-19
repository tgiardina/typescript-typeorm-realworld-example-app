import { assert, request } from 'chai';
import { Application } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { Connection } from 'typeorm';

import initApp from '../../../../src/app';
import { IUser } from '../interfaces';
import initLoaders from '../../../loaders';
import { initConnection } from '../../../utils';

initLoaders();

describe('/GET user 200', () => {
  const username = "username";
  const token = sign({ id: 1, username }, process.env.JWT_SECRET);
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
        body = res.body.user;
        done();
      });
  });

  it('should have 200 status', () => {
    assert.equal(status, 200);
  });

  it('should have correct username in body', () => {
    assert.equal(body.user.username, username);
  });

  it('should have correct token in body', () => {
    const deserialized = <{ [key: string]: unknown }>verify(
      body.user.token,
      process.env.JWT_SECRET,
    );
    assert.equal(deserialized.id, 1);
    assert.equal(deserialized.username, username);
  });
})  
