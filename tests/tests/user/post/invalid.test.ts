import { assert, request } from 'chai';
import { Application } from 'express';
import { Connection } from 'typeorm';

import '../../../loaders';
import initApp from '../../../../src/app';
import { IError } from '../../interfaces';
import { initConnection } from '../../../utils';

describe('POST /api/users - invalid data', () => {
  const data = {
    email: "username@example.com",
    password: "password",
    username: "username",
  };
  let app: Application;
  let bodies: { [key: string]: IError };
  let connection: Connection;
  let statuses: { [key: string]: number };

  before(async () => {
    app = await initApp();
    bodies = {};
    connection = await initConnection();
    statuses = {};
  });

  after(async () => {
    await connection.close();
  });

  it('should run.', async () => {
    await Promise.all(Object.keys(data).map(key => {
      const partialData = { ...data };
      delete partialData[key];
      return new Promise((done) => {
        request(app)
          .post('/api/users')
          .type('json')
          .send(partialData)
          .end((_err, res) => {
            bodies[key] = res.body;
            statuses[key] = res.status;
            done();
          });
      });
    }));
  });

  it('should have a 422 status.', () => {
    for (const status of Object.values(statuses)) {
      assert.equal(status, 422);
    }
  });

  it('should have an error body.', () => {
    for (const body of Object.values(bodies)) {
      assert.equal(body.errors.body.length, 1);
    }
  });
})  
