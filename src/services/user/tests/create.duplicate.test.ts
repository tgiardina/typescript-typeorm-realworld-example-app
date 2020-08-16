import 'mocha';
import 'reflect-metadata';
import { assert } from 'chai';
import { stub } from 'sinon';

import { UserService } from '../';
import { Result } from '../../../helpers';

describe('UserService.create', () => {
  const error = { code: "ER_DUP_ENTRY" };
  let result: Result<unknown>;
  let userService: UserService<void>;

  before(async () => {
    const cipher = { tokenize: stub() };
    const userRepository = {
      create: stub(),
      findOne: null,
      save: stub().throws(error),
    };
    userService = new UserService(userRepository, cipher);
  });

  describe('is passed duplicate data', () => {
    it('should run without error', async () => {
      result = await userService.create();
    })

    it('should return a failure result', async () => {
      assert(!result.isOk);
    });

    it('should return the correct error code', async () => {
      assert.equal(result.error, error.code);
    });
  });
}) 
