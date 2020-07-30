import { assert, request } from 'chai';

import initApp            from '../../../app';
import initLoaders        from '../../loaders';
import { initConnection } from '../../helpers';

initLoaders();

describe('/POST users', () => {
  let app;
  let connection;
  const username = "duplicate";    
  
  before(async () => {
    app        = await initApp();
    connection = await initConnection();
    await connection.manager.query(
      `INSERT INTO user VALUES(\n\
        DEFAULT,\n\
        DEFAULT,\n\
        DEFAULT,\n\
        "${username}"\n\
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
