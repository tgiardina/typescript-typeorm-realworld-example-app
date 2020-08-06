import { assert, request } from 'chai';
import { Connection } from 'typeorm';

import initApp from '../../../src/app';
import initLoaders from '../../loaders';
import { initConnection } from '../../utils';

initLoaders();

describe('/POST users', () => {
  let app;
  let connection: Connection;
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

  it('should return 409 error.', (done) => {
    request(app)
      .post('/users')
      .type('json')
      .send({
        username
      })
      .end((err, res) => {
        assert.equal(res.status, 409);
        done();
      });
  });
})  
