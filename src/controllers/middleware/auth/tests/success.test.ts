import 'reflect-metadata';
import { assert } from 'chai';
import 'mocha';
import { createSandbox, SinonSandbox, SinonStub } from 'sinon';

import { AuthMiddleware, IAuthMiddleware, IBasicResponse } from '../';

describe('AuthMiddleware.authenticate', () => {
  const token = "token";
  const req = { headers: { authorization: token } };
  const user = {
    username: "username",
    token,
  };
  let auth: IAuthMiddleware;
  let jsonStub: SinonStub;
  let nextStub: SinonStub;
  let res: IBasicResponse;
  let sandbox: SinonSandbox;

  before(async () => {
    sandbox = createSandbox();
    nextStub = sandbox.stub();
    jsonStub = sandbox.stub();
    res = {
      json: jsonStub,
      locals: {},
      status: () => res,
    };
    const getToken = sandbox.stub().returns(token);
    const verify = sandbox.stub().returns(user);
    auth = new AuthMiddleware(getToken, verify);
  });

  after(async () => {
    sandbox.restore();
  });

  describe('is passed a valid token', () => {
    it('should run without error', async () => {
      auth.authenticate(req, res, nextStub);
    })

    it('should append user to res.locals', async () => {
      assert.equal(res.locals.user, user);
    });

    it('should have called next', async () => {
      assert(nextStub.calledOnce);
    });

    it('should not have called json', async () => {
      assert(jsonStub.notCalled);
    });
  });
}) 
