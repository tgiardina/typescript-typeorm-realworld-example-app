import { assert } from 'chai';
import 'mocha';
import { createSandbox, SinonSandbox, SinonStub } from 'sinon';
import { QueryFailedError } from 'typeorm';

import { UserService } from './';
import { IUserData } from '../../interfaces';

describe('UserService.create', () => {
  const data: IUserData = { username: "duplicate" };
  const error = { code: "ER_DUP_ENTRY" };
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

  describe('is passed a duplicate username', () => {
    it('should throw a "duplicate" error', async () => {
      const result = await userService.create(data);
      assert(!result.isOk);
      assert.equal(result.error, error.code);
    })

    it('should have called `create` with username', async () => {
      const args = createStub.args[0];
      assert(createStub.calledOnce);
      assert.equal(args.length, 1);
      assert.equal(args[0].username, data.username);
    })
  });
}) 
