import { assert, request } from 'chai';
import { Application } from 'express';
import { verify } from 'jsonwebtoken';
import { Connection } from 'typeorm';

import initApp from '../../../../src/app';
import { IUser } from '../interfaces';
import initLoaders from '../../../loaders';
import { initConnection } from '../../../utils';

initLoaders();

describe('POST /api/users 201', () => {
  const data = {
    username: "username",
  };
  let app: Application;
  let body: IUser;
  let connection: Connection;
  let status: number;

  before(async () => {
    app = await initApp();
    connection = await initConnection();
  });

  after(async () => {
    await connection.close();
  });

  it('should run.', (done) => {
    request(app)
      .post('/users')
      .type('json')
      .send(data)
      .end((_err, res) => {
        body = res.body;
        status = res.status;
        done();
      });
  });

  it('should have a 201 status', () => {
    assert.equal(status, 201);
  });

  it('should include token in body', () => {
    const decodedToken = <{ id: number, username: string }>verify(
      body.user.token,
      process.env.JWT_SECRET,
    );
    assert.equal(decodedToken.id, 1);
    assert.equal(decodedToken.username, body.user.username);
  })
})  
