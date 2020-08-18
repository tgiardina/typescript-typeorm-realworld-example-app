import 'reflect-metadata';
import { assert } from 'chai';
import 'mocha';
import { createSandbox, SinonSandbox, SinonStub } from 'sinon';

import { DeserializeMiddleware } from '../';

describe('AuthMiddleware.authenticate', () => {
  const req = {
    headers: { authorization: null },
    locals: {},
  };
  let deserializer: DeserializeMiddleware;
  let nextStub: SinonStub;
  let sandbox: SinonSandbox;

  before(async () => {
    sandbox = createSandbox();
    nextStub = sandbox.stub();
    const jwtParser = { deserialize: sandbox.stub().throws(new Error()) };
    deserializer = new DeserializeMiddleware(jwtParser);
  });

  after(async () => {
    sandbox.restore();
  });

  describe('is passed an invalid token', () => {
    it('should run without error', async () => {
      deserializer.deserialize(req, {}, nextStub);
    })

    it('should have called next once', async () => {
      assert(nextStub.calledOnce);
    });
  });
}) 
