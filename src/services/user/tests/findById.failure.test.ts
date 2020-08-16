import 'reflect-metadata';
import { assert } from 'chai';
import 'mocha';
import { stub } from 'sinon';

import { UserService } from '../';
import { Result } from '../../../helpers';
import { IUserTokenizable } from '../interfaces';

describe('UserService.findById', () => {
  const id = 1;
  let result: Result<IUserTokenizable>;
  let userService: UserService<void>;

  before(async () => {
    const cipher = { tokenize: stub() };
    const userRepository = {
      create: null,
      findOne: stub(),
      save: null,
    };
    userService = new UserService(userRepository, cipher);
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
