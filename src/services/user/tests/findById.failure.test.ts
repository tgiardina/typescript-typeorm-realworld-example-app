import 'reflect-metadata';
import { assert } from 'chai';
import 'mocha';
import { createSandbox, SinonSandbox } from 'sinon';

import { UserService } from '../';
import { Result } from '../../../helpers';

describe('UserService.findById', () => {
  const id = 1;
  let result: Result<void>;
  let sandbox: SinonSandbox;
  let userService: UserService<void>;

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
      result = await userService.findById(id);
    })

    it('should return an ok result', async () => {
      assert(!result.isOk);
    });

    it('should return the correct error code', async () => {
      assert.equal(result.error, "ER_NOT_FOUND");
    });
  });
}) 
