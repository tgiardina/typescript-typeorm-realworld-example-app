import 'reflect-metadata';
import 'mocha';
import { assert } from 'chai';
import { createSandbox, SinonSandbox, SinonStub } from 'sinon';

import { SerializeMiddleware } from '../';
import { IResponse } from '../interfaces';

describe('SerializeMiddleware.serialize', () => {
  const user = {
    id: 1,
  };
  const res: IResponse = {
    body: {
      user: user,
    },
    send: null,
  };
  const token = "token";
  let result: { user: { id: number, token: string } };
  let serializer: SerializeMiddleware;
  let nextStub: SinonStub;
  let sandbox: SinonSandbox;

  before(async () => {
    sandbox = createSandbox();
    nextStub = sandbox.stub();
    const jwtCipher = { serialize: sandbox.stub().returns(token) };
    serializer = new SerializeMiddleware(jwtCipher);
  });

  after(async () => {
    sandbox.restore();
  });

  describe('is passed a body with a user', () => {
    it('should run without error', async () => {
      serializer.serialize(null, res, nextStub);
    })

    it('should have stringified body', async () => {
      result = <typeof result>JSON.parse(<string>res.body);
    });

    it('should have kept original properties', async () => {
      assert.equal(result.user.id, user.id);
    });

    it('should have appended token', async () => {
      assert.equal(result.user.token, token);
    });

    it('should have called next', async () => {
      assert(nextStub.calledOnce);
    });
  });
}) 
