import 'reflect-metadata';
import { assert } from 'chai';
import 'mocha';
import { createSandbox, SinonSandbox, SinonStub } from 'sinon';

import { UserService } from './';

describe('UserService.create', () => {
  const data = { username: "duplicate" };
  const error = { code: "ER_DUP_ENTRY" };
  let createStub: SinonStub;
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
    it('should throw a "duplicate" error', async () => {
      const result = await userService.create(data);
      assert(!result.isOk);
      assert.equal(result.error, error.code);
    })

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
