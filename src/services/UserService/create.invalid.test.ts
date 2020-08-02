import { assert } from 'chai';
import 'mocha';
import { createSandbox, SinonSandbox, SinonStub } from 'sinon';
import { QueryFailedError } from 'typeorm';

import { UserService } from './';
import { IUserData } from '../../interfaces';

describe('UserService.create', () => {
  // @ts-ignore
  const data: IUserData = {};
  const error = { code: "ER_NO_DEFAULT_FOR_FIELD" };
  let createStub: SinonStub;
  let sandbox: SinonSandbox;
  let userService: UserService;

  before(async () => {
    sandbox = createSandbox();
    const UserModel = {
      create: createStub = sandbox.stub().throws(error),
    };
    userService = new UserService(UserModel);
  });

  after(async () => {
    sandbox.restore();
  });

  describe('is passed empty data username', () => {
    it('should throw an "invalid" error', async () => {
      const result = await userService.create(data);
      assert(!result.isOk);
      assert.equal(result.error, error.code);
    })

    it('should have called `create` with nothing', async () => {
      const args = createStub.args[0];
      assert(createStub.calledOnce);
      assert.equal(args.length, 1);
    })
  });
}) 
