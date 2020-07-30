import { assert, request } from 'chai';

import initApp            from '../../../app';
import initLoaders        from '../../loaders';
import { initConnection } from '../../utils';

initLoaders();

describe('/POST users', () => {
  let app;
  let connection;
  
  before(async () => {
    app        = await initApp();
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
      .end((err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });
})  
