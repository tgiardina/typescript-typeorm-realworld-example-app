import { assert, request } from 'chai';
import { Application } from 'express';
import { sign } from 'jsonwebtoken';
import { Connection } from 'typeorm';

import initApp from '../../../../src/app';
import { IError } from '../../interfaces';
import initLoaders from '../../../loaders';
import { initConnection } from '../../../utils';

initLoaders();

describe('GET /api/user - expired token', () => {
  const data = {
    email: "username@example.com",
    password: "password",
    username: "username",
  };
  const token = sign({
    id: 1,
    email: data.email,
    password: data.password,
    iat: Math.floor(Date.now() / 1000) - 60 * 60, // Backdate by an hour
  }, process.env.JWT_SECRET);
  let app: Application;
  let body: IError;
  let connection: Connection;
  let status: number;

  before(async () => {
    app = await initApp();
    connection = await initConnection();
  });

  after(async () => {
    await connection.close();
  });

  it('should run', (done) => {
    request(app)
      .get('/api/user')
      .set('Authorization', `Token ${token}`)
      .end((_err, res) => {
        body = res.body;
        status = res.status;
        done();
      });
  });

  it('should have a 401 status', () => {
    assert.equal(status, 401);
  });

  it('should have an error body.', () => {
    assert.equal(body.errors.body.length, 1);
  });
})  
