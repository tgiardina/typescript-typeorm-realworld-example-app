import { assert, request } from 'chai';
import { Application } from 'express';
import { Connection } from 'typeorm';

import '../../../loaders';
import initApp from '../../../../src/app';
import { IError } from '../../interfaces';
import { initConnection } from '../../../utils';

describe('POST /api/users - duplicate', () => {
  const data = {
    email: "username@example.com",
    password: "password",
    username: "username",
  };
  let app: Application;
  let body: IError;
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
        "differentPassword",\n\
        "differentUsername",\n\
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
      .post('/api/users')
      .type('json')
      .send(data)
      .end((_err, res) => {
        body = res.body;
        status = res.status;
        done();
      });
  });

  it('should have a 422 status', () => {
    assert.equal(status, 422);
  });

  it('should have an error body.', () => {
    assert.equal(body.errors.body.length, 1);
  });
})  
