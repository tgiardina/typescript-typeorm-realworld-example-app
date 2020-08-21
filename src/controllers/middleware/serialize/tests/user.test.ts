import 'mocha';
import 'reflect-metadata';
import { assert } from 'chai';
import { stub } from 'sinon';

import { SerializeMiddleware } from '../';
import { } from '../interfaces';

describe('SerializeMiddleware.setup - user', () => {
  // Data
  const data = { user: { id: 1, token: null } };
  const res = {
    body: data,
  };
  const token = "token";
  // Stubs
  const jwtSerializer = { serialize: stub().returns(token) };
  const nextStub = stub();

  describe('is passed a body with a user', () => {
    it('should run without error', async () => {
      const serializer = new SerializeMiddleware(jwtSerializer);
      serializer.setup(null, res, nextStub);
    })

    it('should have kept original properties', async () => {
      assert.equal(res.body.user.id, data.user.id);
    });

    it('should have appended token', async () => {
      assert.equal(res.body.user.token, token);
    });

    it('should have called next', async () => {
      assert(nextStub.calledOnce);
    });
  });
}) 
