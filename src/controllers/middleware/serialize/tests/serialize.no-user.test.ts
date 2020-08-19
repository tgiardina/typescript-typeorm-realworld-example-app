import 'mocha';
import 'reflect-metadata';
import { assert } from 'chai';
import { stub } from 'sinon';

import { SerializeMiddleware } from '../';

describe('SerializeMiddleware.serialize', () => {
  // Data
  const params = { data: "data" };
  const data = { ...params };
  const token = "token";
  // Stubs
  let jsonStub = stub();
  const jwtCipher = { serialize: stub().returns(token) };

  describe('is passed a body without a user', () => {
    it('should run without error', async () => {
      const serializer = new SerializeMiddleware(jwtCipher);
      serializer["serialize"](jsonStub, data);
    })

    it('should have kept original properties', async () => {
      assert.equal(data.data, params.data);
    });

    it('should not have appended token', async () => {
      assert.equal(Object.keys(data).length, 1);
    });

    it('should have called json', async () => {
      assert(jsonStub.calledOnce);
    });
  });
}) 
