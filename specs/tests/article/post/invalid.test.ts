import { assert, expect, request } from 'chai';
import { Application } from 'express';
import { sign } from 'jsonwebtoken';
import { Connection } from 'typeorm';

import '../../../loaders';
import initApp from '../../../../src/app';
import { IError } from '../../interfaces';
import { initConnection } from '../../../utils';

describe('POST /api/articles - invalid data', () => {
  let app: Application;
  let connection: Connection;
  const bodies: { [key: string]: IError } = {}
  const responses = {}
  const statuses: { [key: string]: number } = {};
  const user = {
    id: 1,
    email: "username@example.com",
    password: "password",
    username: "username",
  };
  const token = sign({ id: user.id }, <string>process.env.JWT_SECRET);
  const article = {
    slug: "a-slug",
    title: "A Title",
    description: "This is an article.",
    body: "A discussion about something.",
  };

  before(async () => {
    app = await initApp();
    connection = await initConnection();
  });

  after(async () => {
    await connection.close();
  });

  it('should run.', async () => {
    await Promise.all(Object.keys(article).map(key => {
      const partialArticle = { ...article };
      delete partialArticle[key];
      const data = { article: partialArticle };
      return new Promise((done) => {
        request(app)
          .post('/api/articles')
          .set({ "Authorization": `Bearer ${token}` })
          .type('json')
          .send(data)
          .end((_err, res) => {
            responses[key] = res;
            bodies[key] = res.body;
            statuses[key] = res.status;
            done();
          });
      });
    }));
  });

  it('should match OpenApi spec', () => {
    for (const response of Object.values(responses)) {
      expect(response).to.satisfyApiSpec;
    }
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
