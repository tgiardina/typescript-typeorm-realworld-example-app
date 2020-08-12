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
    const userModel = {
      ...data,
      toDto: () => {
        return {
          ...data,
        };
      }
    };
    const userRepository = {
      create: sandbox.stub(),
      findOne: sandbox.stub().returns(userModel),
      save: sandbox.stub(),
    };
    userService = new UserService(userRepository);
  });

  after(async () => {
    sandbox.restore();
  });

  describe('is passed a valid id', () => {
    it('should run without error', async () => {
      result = await userService.findById(data.id);
    })

    it('should return an ok result', async () => {
      assert(result.isOk);
    });

    it('should return the correct UserDto', async () => {
      assert.equal(result.value.id, data.id);
      assert.equal(result.value.username, data.username);
      assert.equal(result.value.token, data.token);
    });
  });
}) 
