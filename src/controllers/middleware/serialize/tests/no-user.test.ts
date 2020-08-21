import 'mocha';
import 'reflect-metadata';
import { assert } from 'chai';
import { stub } from 'sinon';

import { SerializeMiddleware } from '../';
import { } from '../interfaces';

describe('SerializeMiddleware.setup - no user', () => {
  // Data
  const data = { errors: { body: ["error"] } };
  const res = {
    body: data,
  };
  // Stubs
  const jwtSerializer = { serialize: stub().returns("token") };
  const nextStub = stub();

  describe('is passed a body without a user', () => {
    it('should run without error', async () => {
      const serializer = new SerializeMiddleware(jwtSerializer);
      serializer.setup(null, res, nextStub);
    })

    it('should have kept original properties', async () => {
      assert.equal(res.body.errors.body[0], data.errors.body[0]);
    });

    it('should not have appended anything', async () => {
      assert.equal(Object.keys(res.body).length, 1);
      assert.equal(Object.keys(res.body.errors).length, 1);
      assert.equal(res.body.errors.body.length, 1);
    });

    it('should have called next', async () => {
      assert(nextStub.calledOnce);
    });
  });
}) 
