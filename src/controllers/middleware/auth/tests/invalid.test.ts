import 'reflect-metadata';
import { assert } from 'chai';
import 'mocha';
import { createSandbox, SinonSandbox, SinonStub } from 'sinon';

import { AuthMiddleware, IAuthMiddleware } from '../';
import { IBaseResponse } from '../../../interfaces';

describe('AuthMiddleware.authenticate', () => {
  const req = {
    headers: { authorization: null },
    locals: {},
  };
  let auth: IAuthMiddleware;
  let nextStub: SinonStub;
  let res: IBaseResponse;
  let sandbox: SinonSandbox;

  before(async () => {
    sandbox = createSandbox();
    nextStub = sandbox.stub();
    res = {
      json: sandbox.stub(),
      locals: {},
      status: () => res,
    };
    const jwtParser = { verify: sandbox.stub().throws(new Error()) };
    auth = new AuthMiddleware(jwtParser);
  });

  after(async () => {
    sandbox.restore();
  });

  describe('is passed an invalid token', () => {
    it('should run without error', async () => {
      auth.parse(req, res, nextStub);
    })

    it('should have called next once', async () => {
      assert(nextStub.calledOnce);
    });
  });
}) 
