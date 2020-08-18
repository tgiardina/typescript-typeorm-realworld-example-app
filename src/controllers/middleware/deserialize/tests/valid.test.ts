import 'reflect-metadata';
import { assert } from 'chai';
import 'mocha';
import { createSandbox, SinonSandbox, SinonStub } from 'sinon';

import { DeserializeMiddleware } from '../';

describe('AuthMiddleware.authenticate', () => {
  const token = "token";
  const req = {
    headers: { authorization: token },
    locals: { user: null },
  };
  const user = {
    username: "username",
    token,
  };
  let deserializer: DeserializeMiddleware;
  let nextStub: SinonStub;
  let sandbox: SinonSandbox;

  before(async () => {
    sandbox = createSandbox();
    nextStub = sandbox.stub();
    const jwtParser = { deserialize: sandbox.stub().returns(user) };
    deserializer = new DeserializeMiddleware(jwtParser);
  });

  after(async () => {
    sandbox.restore();
  });

  describe('is passed a valid token', () => {
    it('should run without error', async () => {
      deserializer.deserialize(req, {}, nextStub);
    })

    it('should append user to res.locals', async () => {
      assert.equal(req.locals.user, user);
    });

    it('should have called next', async () => {
      assert(nextStub.calledOnce);
    });
  });
}) 
