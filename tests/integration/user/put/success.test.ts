import { assert, request } from 'chai';
import { Application } from 'express';
import { verify } from 'jsonwebtoken';
import { Connection } from 'typeorm';

import initApp from '../../../../src/app';
import { IToken, IUser, IUserDbSchema } from '../interfaces';
import initLoaders from '../../../loaders';
import { initConnection } from '../../../utils';

initLoaders();

describe('PUT /api/users - success', () => {
  const data = {
    bio: "I was hatched.",
    email: "username@example.com",
    image: "https://i.stack.imgur.com/xHWG8.jpg",
    password: "password",
    username: "username",
  };
  let app: Application;
  let body: IUser;
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
      .put('/api/user')
      .type('json')
      .send(data)
      .end((_err, res) => {
        body = res.body;
        status = res.status;
        done();
      });
  });

  it('should have a 200 status', () => {
    assert.equal(status, 200);
  });

  it('should include properties.', () => {
    assert.equal(body.user.bio, data.bio);
    assert.equal(body.user.email, data.email);
    assert.equal(body.user.image, data.image);
    assert.equal(body.user.token.substring(0, 3), "eyJ");
    assert.equal(body.user.username, data.username);
  })

  it('should include valid token.', () => {
    const decodedToken = <IToken>verify(
      body.user.token,
      process.env.JWT_SECRET,
    );
    assert.equal(decodedToken.id, 1);
    assert.equal(decodedToken.email, data.email);
    assert.equal(decodedToken.password, data.password);
  });

  it('should have saved in the database.', async () => {
    const user = <IUserDbSchema>await connection.manager.query(
      'SELECT * FROM user;'
    )[0];
    assert.equal(user.bio, null);
    assert.equal(user.email, data.email);
    assert.equal(user.image, null);
    assert.equal(user.password, data.password);
    assert.equal(user.username, data.username);
  });
})  
