import 'reflect-metadata';
import { assert } from 'chai';
import 'mocha';
import { createSandbox, SinonSandbox, SinonStub } from 'sinon';

import { UserService } from './';
import { Result } from '../../helpers';
import { IUserDto } from '../../models';

describe('UserService.create', () => {
  const data = {
    username: "duplicate",
    token: "token",
  };
  const error = { code: "ER_DUP_ENTRY" };
  let createStub: SinonStub;
  let result: Result<IUserDto>;
  let sandbox: SinonSandbox;
  let saveStub: SinonStub;
  let userService: UserService;

  before(async () => {
    sandbox = createSandbox();
    const userRepository = {
      create: createStub = sandbox.stub().returns(data),
      save: saveStub = sandbox.stub().throws(error),
    };
    userService = new UserService(userRepository);
  });

  after(async () => {
    sandbox.restore();
  });

  describe('is passed a duplicate username', () => {
    it('should run without error', async () => {
      result = await userService.create(data);
    })

    it('should return a failure result', async () => {
      assert(!result.isOk);
    });

    it('should return the correct error code', async () => {
      assert.equal(result.error, error.code);
    });

    it('should have called `create` with username', async () => {
      assert(createStub.calledOnce);
      const args = createStub.args[0];
      assert.equal(args.length, 1);
      const user = args[0];
      assert.equal(user.username, data.username);
    })

    it('should have called `save` with user', async () => {
      assert(saveStub.calledOnce);
      const args = saveStub.args[0];
      assert.equal(args.length, 1);
      const user = args[0];
      assert.equal(user.username, data.username);
    })
  });
}) 
