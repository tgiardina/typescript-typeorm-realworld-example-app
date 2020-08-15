import 'reflect-metadata';
import { assert } from 'chai';
import 'mocha';
import { createSandbox, SinonSandbox, SinonStub } from 'sinon';

import { UserService } from '../';
import { Result } from '../../../helpers';

describe('UserService.create', () => {
  const input = "duplicate";
  const entity = { toDto: () => { } };
  const error = { code: "ER_DUP_ENTRY" };
  let createStub: SinonStub;
  let result: Result<Object>;
  let sandbox: SinonSandbox;
  let saveStub: SinonStub;
  let userService: UserService<string>;

  before(async () => {
    sandbox = createSandbox();
    const userRepository = {
      create: createStub = sandbox.stub().returns(entity),
      findOne: sandbox.stub(),
      save: saveStub = sandbox.stub().throws(error),
    };
    userService = new UserService(userRepository);
  });

  after(async () => {
    sandbox.restore();
  });

  describe('is passed duplicate data', () => {
    it('should run without error', async () => {
      result = await userService.create(input);
    })

    it('should return a failure result', async () => {
      assert(!result.isOk);
    });

    it('should return the correct error code', async () => {
      assert.equal(result.error, error.code);
    });

    it('should have called `create` with input', async () => {
      assert(createStub.calledOnce);
      const args = createStub.args[0];
      assert.equal(args.length, 1);
      const user = args[0];
      assert.equal(user, input);
    })

    it('should have called `save` with entity', async () => {
      assert(saveStub.calledOnce);
      const args = saveStub.args[0];
      assert.equal(args.length, 1);
      const user = args[0];
      assert.equal(user, entity);
    })
  });
}) 
