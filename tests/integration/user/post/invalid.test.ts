import { assert, request } from 'chai';
import { Application } from 'express';
import { Connection } from 'typeorm';

import initApp from '../../../../src/app';
import { IError } from '../../interfaces';
import initLoaders from '../../../loaders';
import { initConnection } from '../../../utils';

initLoaders();

describe('POST /api/users 400', () => {
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

  it('should run.', (done) => {
    request(app)
      .post('/users')
      .type('json')
      .send({})
      .end((_err, res) => {
        body = res.body;
        status = res.status;
        done();
      });
  });

  it('should have a 400 status.', () => {
    assert.equal(status, 400);
  });

  it('should have an error body.', () => {
    assert.equal(body.errors.body.length, 1);
  });
})  
