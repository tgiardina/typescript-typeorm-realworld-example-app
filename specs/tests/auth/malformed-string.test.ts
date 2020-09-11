import { assert, expect, request } from 'chai';
import { Application, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { Connection } from 'typeorm';

import '../../loaders';
import initApp from '../../../src/app';
import { initConnection } from '../../utils';

describe('Auth Middleware (POST /api/articles) - malformed string', () => {
  const user = {
    id: 1,
    email: "username@example.com",
    password: "password",
    username: "username",
  };
  const article = {
    slug: "a-slug",
    title: "A Title",
    description: "This is an article.",
    body: "A discussion about something.",
    tagList: ["tag1", "tag2"],
  };
  const token = sign({ id: user.id }, <string>process.env.JWT_SECRET);
  const data = { article };
  let app: Application;
  let connection: Connection;
  let response: Response;
  let status: number;

  before(async () => {
    app = await initApp();
    connection = await initConnection();
    await connection.manager.query(
      `INSERT INTO user VALUES(\n\
        DEFAULT,\n\
        DEFAULT,\n\
        "${user.email}",\n\
        DEFAULT,\n\
        "${user.password}",\n\
        "${user.username}",\n\
        DEFAULT,\n\
        DEFAULT\n\
       );`
    );
  });

  after(async () => {
    await connection.close();
  });

  it('should run.', (done) => {
    request(app)
      .post('/api/articles')
      .set({ "Authorization": `TYPO ${token}` })
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
