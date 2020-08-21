import 'mocha';
import 'reflect-metadata';
import { assert } from 'chai';
import { stub } from 'sinon';

import { DeserializeMiddleware } from '../';

describe('DeserializeMiddleware.setup - invalid token', () => {
  // Data
  const req = {
    headers: { authorization: null },
  };
  // Stubs
  const jwtParser = { deserialize: stub().throws(new Error()) };
  const nextStub = stub();

  describe('is passed an invalid token', () => {
    it('should run without error', async () => {
      const deserializer = new DeserializeMiddleware(jwtParser);
      deserializer.setup(req, {}, nextStub);
    })

    it('should have called next once', async () => {
      assert(nextStub.calledOnce);
    });
  });
}) 
