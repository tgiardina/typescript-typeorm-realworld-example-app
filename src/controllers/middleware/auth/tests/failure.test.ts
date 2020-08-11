import 'reflect-metadata';
import { assert } from 'chai';
import 'mocha';
import { createSandbox, SinonSandbox, SinonStub } from 'sinon';

import { AuthMiddleware, IAuthMiddleware, IBasicResponse } from '../';

describe('AuthMiddleware.authenticate', () => {
  const req = { headers: { authorization: null } };
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
    const getToken = sandbox.stub();
    const verify = sandbox.stub().throws(new Error());
    auth = new AuthMiddleware(getToken, verify);
  });

  after(async () => {
    sandbox.restore();
  });

  describe('is passed an invalid token', () => {
    it('should run without error', async () => {
      auth.authenticate(req, res, nextStub);
    })

    it('should not have called next', async () => {
      assert(nextStub.notCalled);
    });

    it('should have called json once', async () => {
      assert(jsonStub.calledOnce);
    });
  });
}) 
