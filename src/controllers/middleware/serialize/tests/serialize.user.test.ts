import 'mocha';
import 'reflect-metadata';
import { assert } from 'chai';
import { stub } from 'sinon';

import { SerializeMiddleware } from '../';
import { IDto } from '../interfaces';

describe('SerializeMiddleware.serialize', () => {
  // Data
  const params: IDto = { user: { id: 1 } };
  const data = { ...params };
  const token = "token";
  // Stubs
  const jsonStub = stub();
  const jwtCipher = { serialize: stub().returns(token) };

  describe('is passed a body without a user', () => {
    it('should run without error', async () => {
      const serializer = new SerializeMiddleware(jwtCipher);
      serializer["serialize"](jsonStub, data);
    })

    it('should have kept original properties', async () => {
      assert.equal(data.user.id, params.user.id);
    });

    it('should have appended token', async () => {
      assert.equal(data.user.token, token);
    });

    it('should have called json', async () => {
      assert(jsonStub.calledOnce);
    });
  });
}) 
