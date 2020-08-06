import { assert, request } from 'chai';
import { Application } from 'express';
import { Connection } from 'typeorm';

import initApp from '../../../src/app';
import initLoaders from '../../loaders';
import { initConnection } from '../../utils';

initLoaders();

describe('/POST users', () => {
  let app: Application;
  let connection: Connection;

  before(async () => {
    app = await initApp();
    connection = await initConnection();
  });

  after(async () => {
    await connection.close();
  });

  it('should return 400 error.', (done) => {
    request(app)
      .post('/users')
      .type('json')
      .send({})
      .end((_err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });
})  
