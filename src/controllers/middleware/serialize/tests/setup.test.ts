import 'mocha';
import 'reflect-metadata';
import { assert } from 'chai';
import { stub } from 'sinon';

import { SerializeMiddleware } from '../';
import { IDto } from '../interfaces';

describe('SerializeMiddleware.setup', () => {
  // Data
  const params: IDto = { user: { id: 1 } };
  const data = { ...params };
  const token = "token";
  // Stubs
  const nextStub = stub();
  const res = {
    json: stub(),
  };
  const jwtCipher = { serialize: stub().returns(token) };

  describe('is run', () => {
    it('should run without error', async () => {
      const serializer = new SerializeMiddleware(jwtCipher);
      serializer.setup({}, res, nextStub);
    })

    it('should have switched out res.json', async () => {
      res.json(data);
      assert.equal(data.user.id, params.user.id);
      assert.equal(data.user.token, token);
    });

    it('should have called next', async () => {
      assert(nextStub.calledOnce);
    });
  });
}) 
