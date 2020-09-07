import { assert, request } from 'chai';
import { Application } from 'express';
import { sign } from 'jsonwebtoken';
import { Connection } from 'typeorm';

import '../../../loaders';
import initApp from '../../../../src/app';
import { IError } from '../../interfaces';
import { initConnection } from '../../../utils';

describe('POST /api/articles - no user', () => {
  const article = {
    slug: "a-slug",
    title: "A Title",
    description: "This is an article.",
    body: "A discussion about something.",
    tagList: ["tag1", "tag2"],
  };
  const token = sign({
    id: 1,
    email: "username@example.com",
    password: "password",
  }, process.env.JWT_SECRET);
  const data = { article };
  let app: Application;
  let body: IError;
  let connection: Connection;
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
        body = res.body;
        status = res.status;
        done();
      });
  });

  it('should have a 401 status', () => {
    assert.equal(status, 401);
  });

  it('should have an error body.', () => {
    assert.equal(body.errors.body.length, 1);
  });
})
