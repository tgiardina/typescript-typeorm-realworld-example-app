import  chaiHttp = require('chai-http');
import { assert, request, use } from 'chai';
import * as dotenv              from 'dotenv';
import { getConnection }        from 'typeorm';

import initApp  from '../../app';

dotenv.config({ path: `${__dirname}/../../../.env.test` });
use(chaiHttp);

describe('/POST users', () => {
  let app;
  let connection;
  const username = "duplicate";
  
  before(async () => {
    app = await initApp();
    connection = await getConnection();
    await Promise.all(connection.entityMetadatas.map(async (table) => {
      await connection.manager.query(`DELETE FROM ${table.tableName}`);
    }));
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
