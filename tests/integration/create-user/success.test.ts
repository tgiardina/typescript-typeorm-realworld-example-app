import { assert, request } from 'chai';

import initApp from '../../../src/app';
import initLoaders from '../../loaders';
import { initConnection } from '../../utils';

initLoaders();

describe('/POST users', () => {
  let app;
  let connection;

  before(async () => {
    app = await initApp();
    connection = await initConnection();
  });

  after(async () => {
    await connection.close();
  });

  it('should create new user.', (done) => {
    request(app)
      .post('/users')
      .type('json')
      .send({
        username: "new",
      })
      .end((err, res) => {
        assert.equal(res.status, 201);
        done();
      });
  });
})  
