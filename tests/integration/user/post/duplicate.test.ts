import { assert, request } from 'chai';
import { Application } from 'express';
import { Connection } from 'typeorm';

import initApp from '../../../../src/app';
import { IError } from '../../interfaces';
import initLoaders from '../../../loaders';
import { initConnection } from '../../../utils';

initLoaders();

describe('POST /api/users 409', () => {
  let app: Application;
  let body: IError;
  let connection: Connection;
  let status: number;
  const username = "duplicate";

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

  it('should run.', (done) => {
    request(app)
      .post('/users')
      .type('json')
      .send({
        username
      })
      .end((_err, res) => {
        body = res.body;
        status = res.status;
        done();
      });
  });

  it('should have a 409 status', () => {
    assert.equal(status, 409);
  });

  it('should have an error body.', () => {
    assert.equal(body.errors.body.length, 1);
  });
})  
