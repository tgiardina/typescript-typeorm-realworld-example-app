import 'reflect-metadata';
import { assert } from 'chai';
import 'mocha';
import { createSandbox, SinonSandbox, SinonStub } from 'sinon';

import { UserService } from './';
import { IUserModel } from '../../models';

describe('UserService.create', () => {
  // @ts-ignore
  const data: IUser = {};
  const error = { code: "ER_NO_DEFAULT_FOR_FIELD" };
  let createStub: SinonStub;
  let sandbox: SinonSandbox;
  let saveStub: SinonStub;
  let userService: UserService;

  before(async () => {
    sandbox = createSandbox();
    const userRepository = {
      create: createStub = sandbox.stub().throws(error),
      save: saveStub = sandbox.stub(),
    };
    userService = new UserService(userRepository);
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

    it('should have called `create` with empty object', async () => {
      assert(createStub.calledOnce);
      const args = createStub.args[0];
      assert.equal(args.length, 1);
      const user = args[0];
      assert.equal(Object.keys(user).length, 0);
    })

    it('should not have called `save`', async () => {
      assert(saveStub.notCalled);
    })
  });
}) 
