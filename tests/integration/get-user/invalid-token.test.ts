import { assert, request } from 'chai';
import { Application } from 'express';
import { Connection } from 'typeorm';

import initApp from '../../../src/app';
import initLoaders from '../../loaders';
import { initConnection } from '../../utils';

initLoaders();

describe('/GET user', () => {
  let app: Application;
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
      .get('/user')
      .end((_err, res) => {
        status = res.status;
        done();
      });
  });

  it('should have a 401 status', () => {
    assert.equal(status, 401);
  });
})  
