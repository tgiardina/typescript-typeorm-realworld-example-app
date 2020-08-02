import { assert } from 'chai';
import 'mocha';
import { createSandbox, SinonSandbox, SinonStub } from 'sinon';

import { UserService } from './';
import { IUserData } from '../../interfaces';

describe('UserService.create', () => {
  const data: IUserData = { username: "username" };
  let createStub: SinonStub;
  let sandbox: SinonSandbox;
  let saveStub: SinonStub;
  let userService: UserService;

  before(async () => {
    sandbox = createSandbox();
    const userModel = {
      ...data,
      save: saveStub = sandbox.stub(),
    };
    const UserModel = {
      create: createStub = sandbox.stub().returns(userModel),
    };
    userService = new UserService(UserModel);
  });

  after(async () => {
    sandbox.restore();
  });

  describe('is passed a valid username', () => {
    it('should return an ok Result', async () => {
      const result = await userService.create(data);
      assert(result.isOk);
      assert.equal(result.value.username, data.username);
    })

    it('should have called `create` with username', async () => {
      const args = createStub.args[0];
      assert(createStub.calledOnce);
      assert.equal(args.length, 1);
      assert.equal(args[0].username, data.username);
    })

    it('should have called `save`', async () => {
      const args = saveStub.args[0];
      assert(saveStub.calledOnce);
      assert.equal(args.length, 0);
    })
  });
}) 
