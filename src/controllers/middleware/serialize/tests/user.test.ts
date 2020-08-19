import 'reflect-metadata';
import 'mocha';
import { assert } from 'chai';
import { stub, SinonStub } from 'sinon';

import { SerializeMiddleware } from '../';
import { IDto } from '../interfaces';

describe('SerializeMiddleware.serialize', () => {
  const params: IDto = { user: { id: 1 } };
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
