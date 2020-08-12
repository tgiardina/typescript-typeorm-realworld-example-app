import 'reflect-metadata';
import { assert } from 'chai';
import 'mocha';
import { createSandbox, SinonSandbox } from 'sinon';

import { UserService } from '../';
import { Result } from '../../../helpers';
import { IUserDto } from '../../../models';

describe('UserService.findById', () => {
  const data = {
    id: 1,
    username: "username",
    token: "token",
  };
  let result: Result<IUserDto>;
  let sandbox: SinonSandbox;
  let userService: UserService;

  before(async () => {
    sandbox = createSandbox();
    const userRepository = {
      create: sandbox.stub(),
      findOne: sandbox.stub(),
      save: sandbox.stub(),
    };
    userService = new UserService(userRepository);
  });

  after(async () => {
    sandbox.restore();
  });

  describe('is passed an invalid id', () => {
    it('should run without error', async () => {
      result = await userService.findById(data.id);
    })

    it('should return an ok result', async () => {
      assert(!result.isOk);
    });

    it('should return the correct error code', async () => {
      assert.equal(result.error, "ER_NOT_FOUND");
    });
  });
}) 