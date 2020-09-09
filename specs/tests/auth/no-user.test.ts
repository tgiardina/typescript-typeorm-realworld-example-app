import { assert, expect, request } from 'chai';
import { Application } from 'express';
import { sign } from 'jsonwebtoken';
import { Connection } from 'typeorm';

import '../../loaders';
import initApp from '../../../src/app';
import { initConnection } from '../../utils';

describe('Auth Middleware (POST /api/articles) - no user', () => {
  const article = {
    slug: "a-slug",
    title: "A Title",
    description: "This is an article.",
    body: "A discussion about something.",
    tagList: ["tag1", "tag2"],
  };
  const token = sign({ id: 1 }, <string>process.env.JWT_SECRET);
  const data = { article };
  let app: Application;
  let connection: Connection;
  let response: any;
  let status: number;

  before(async () => {
    app = await initApp();
    connection = await initConnection();
  });

  after(async () => {
    await connection.close();
  });

  it('should run.', (done) => {
    request(app)
      .post('/api/articles')
      .set({ "Authorization": `Bearer ${token}` })
      .type('json')
      .send(data)
      .end((_err, res) => {
        response = res;
        status = res.status;
        done();
      });
  });

  it('should match OpenApi spec', () => {
    expect(response).to.satisfyApiSpec;
  });

  it('should have a 401 status', () => {
    assert.equal(status, 401);
  });
})
