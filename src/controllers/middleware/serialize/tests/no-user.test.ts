import 'reflect-metadata';
import 'mocha';
import { assert } from 'chai';
import { stub, SinonStub } from 'sinon';

import { SerializeMiddleware } from '../';

describe('SerializeMiddleware.serialize', () => {
  const params = { data: "data" };
  const data = { ...params };
  const token = "token";
  let jsonStub: SinonStub;
  let serializer: SerializeMiddleware;

  before(async () => {
    jsonStub = stub();
    const jwtCipher = { serialize: stub().returns(token) };
    serializer = new SerializeMiddleware(jwtCipher);
  });

  describe('is passed a body without a user', () => {
    it('should run without error', async () => {
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
