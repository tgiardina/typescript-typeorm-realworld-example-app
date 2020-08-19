import 'mocha';
import 'reflect-metadata';
import { assert } from 'chai';
import { stub } from 'sinon';

import { DeserializeMiddleware } from '../';

describe('DeserializeMiddleware.authenticate', () => {
  // Data
  const token = "token";
  const req = {
    headers: { authorization: token },
    locals: { user: null },
  };
  const user = {
    username: "username",
    token,
  };
  // Stubs
  const jwtParser = { deserialize: stub().returns(user) };
  const nextStub = stub();

  describe('is passed a valid token', () => {
    it('should run without error', async () => {
      const deserializer = new DeserializeMiddleware(jwtParser);
      deserializer.deserialize(req, {}, nextStub);
    })

    it('should append user to res.locals', async () => {
      assert.equal(req.locals.user, user);
    });

    it('should have called next', async () => {
      assert(nextStub.calledOnce);
    });
  });
}) 
