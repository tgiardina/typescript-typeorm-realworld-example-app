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
  // @ts-ignore
  let user;

  before(async () => {
    app = await initApp();
    connection = await initConnection();
  });

  after(async () => {
    await connection.close();
  });

  it('should return 201 status.', (done) => {
    request(app)
      .post('/users')
      .type('json')
      .send({
        username: "new",
      })
      .end((_err, res) => {
        assert.equal(res.status, 201);
        user = res.body;
        done();
      });
  });

  it('should include token in body', () => {
    assert.equal(user, "TODO");
  })
})  
