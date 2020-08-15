import 'reflect-metadata';
import { assert } from 'chai';
import 'mocha';
import { createSandbox, SinonSandbox } from 'sinon';

import { UserService } from '../';
import { Result } from '../../../helpers';

describe('UserService.findById', () => {
  const id = 1;
  const output = "output";
  const entity = { toDto: () => output };
  let result: Result<string>;
  let sandbox: SinonSandbox;
  let userService: UserService<string>;

  before(async () => {
    sandbox = createSandbox();
    const userRepository = {
      create: sandbox.stub(),
      findOne: sandbox.stub().returns(entity),
      save: sandbox.stub(),
    };
    userService = new UserService(userRepository);
  });

  after(async () => {
    sandbox.restore();
  });

  describe('is passed a valid id', () => {
    it('should run without error', async () => {
      result = await userService.findById(id);
    })

    it('should return an ok result', async () => {
      assert(result.isOk);
    });

    it('should return correct output', async () => {
      assert.equal(result.value, output);
    });
  });
}) 
