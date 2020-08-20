import { assert, request } from 'chai';
import { Application } from 'express';
import { sign } from 'jsonwebtoken';
import { Connection } from 'typeorm';

import initApp from '../../../../src/app';
import { IError } from '../../interfaces';
import initLoaders from '../../../loaders';
import { initConnection } from '../../../utils';

initLoaders();

describe('GET /api/user - not found', () => {
  const token = sign({ id: 1, username: "username" }, process.env.JWT_SECRET);
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

  it('should have a 404 status', () => {
    assert.equal(status, 404);
  });

  it('should have an error body.', () => {
    assert.equal(body.errors.body.length, 1);
  });
})  
