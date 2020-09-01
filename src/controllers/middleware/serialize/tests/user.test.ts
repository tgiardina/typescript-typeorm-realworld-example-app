import 'mocha';
import 'reflect-metadata';
import { assert } from 'chai';
import { stub } from 'sinon';

import { SerializeMiddleware } from '../';
import { } from '../interfaces';

describe('SerializeMiddleware.setup - user', () => {
  // Data
  const data = { user: { id: 1 } };
  const token = "token";
  // Stubs
  const jsonStub = stub();
  const jwtSerializer = { serialize: stub().returns(token) };
  const nextStub = stub();
  // Composite
  const res = {
    body: null,
    json: jsonStub,
    status: null,
  };

  describe('is passed a body with a user', () => {
    it('should run without error', async () => {
      const serializer = new SerializeMiddleware(jwtSerializer);
      serializer.setup(null, res, nextStub);
      res.json(data);
    })

    it('should have called json', async () => {
      assert(jsonStub.calledOnce);
    });

    it('should have kept original properties', async () => {
      assert.equal(jsonStub.getCall(0).args[0].user.id, data.user.id);
    });

    it('should have appended token', async () => {
      assert.equal(jsonStub.getCall(0).args[0].user.token, token);
    });

    it('should have called next', async () => {
      assert(nextStub.calledOnce);
    });
  });
}) 
