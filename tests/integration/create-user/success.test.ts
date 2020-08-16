import { assert, request } from 'chai';
import { Application } from 'express';
import { verify } from 'jsonwebtoken';
import { Connection } from 'typeorm';

import initApp from '../../../src/app';
import initLoaders from '../../loaders';
import { initConnection } from '../../utils';

initLoaders();

describe('/POST users', () => {
  const data = {
    username: "username",
  };
  let app: Application;
  let connection: Connection;
  let user: {
    id: number,
    username: string,
    token: string,
  };

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
      .send(data)
      .end((_err, res) => {
        assert.equal(res.status, 201);
        user = res.body;
        done();
      });
  });

  it('should include token in body', () => {
    const decodedToken = <any>verify(user.token, process.env.JWT_SECRET);
    assert.equal(user.id, decodedToken.id);
    assert.equal(user.username, decodedToken.username);
  })
})  
