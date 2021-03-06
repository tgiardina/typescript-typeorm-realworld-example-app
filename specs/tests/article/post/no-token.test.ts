import { assert, expect, request } from 'chai';
import { Application, Response } from 'express';
import { Connection } from 'typeorm';

import '../../../loaders';
import initApp from '../../../../src/app';
import { initConnection } from '../../../utils';

describe('POST /api/articles - no token', () => {
  const article = {
    slug: "a-slug",
    title: "A Title",
    description: "This is an article.",
    body: "A discussion about something.",
    tagList: ["tag1", "tag2"],
  };
  const data = { article };
  let app: Application;
  let body: unknown;
  let connection: Connection;
  let response: Response;
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
      .type('json')
      .send(data)
      .end((_err, res) => {
        response = res;
        body = res.body;
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

  it('should not have body', () => {
    assert.equal(body, null);
  });
})
