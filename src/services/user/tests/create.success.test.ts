import 'reflect-metadata';
import { assert } from 'chai';
import 'mocha';
import { createSandbox, SinonSandbox, SinonStub } from 'sinon';

import { UserService } from '../';
import { Result } from '../../../helpers';
import { IUserDto } from '../../../models';

describe('UserService.create', () => {
  const data = {
    username: "username",
    token: "token",
  };
  let createStub: SinonStub;
  let result: Result<IUserDto>;
  let sandbox: SinonSandbox;
  let saveStub: SinonStub;
  let userService: UserService;

  before(async () => {
    sandbox = createSandbox();
    const userModel = {
      ...data,
      toDto: () => {
        return {
          ...data,
        };
      }
    };
    const userRepository = {
      create: createStub = sandbox.stub().returns(userModel),
      findOne: sandbox.stub(),
      save: saveStub = sandbox.stub(),
    };
    userService = new UserService(userRepository);
  });

  after(async () => {
    sandbox.restore();
  });

  describe('is passed a valid username', () => {
    it('should run without error', async () => {
      result = await userService.create(data);
    })

    it('should return an ok result', async () => {
      assert(result.isOk);
    });

    it('should return the correct UserDto', async () => {
      assert.equal(result.value.username, data.username);
      assert.equal(result.value.token, data.token);
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
