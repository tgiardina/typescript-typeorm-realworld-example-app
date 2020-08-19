import 'mocha';
import 'reflect-metadata';
import { assert } from 'chai';
import { stub } from 'sinon';

import { DeserializeMiddleware } from '../';

describe('DeserializeMiddleware.authenticate', () => {
  // Data
  const req = {
    headers: { authorization: null },
    locals: {},
  };
  // Stubs
  const jwtParser = { deserialize: stub().throws(new Error()) };
  const nextStub = stub();

  describe('is passed an invalid token', () => {
    it('should run without error', async () => {
      const deserializer = new DeserializeMiddleware(jwtParser);
      deserializer.deserialize(req, {}, nextStub);
    })

    it('should have called next once', async () => {
      assert(nextStub.calledOnce);
    });
  });
}) 
