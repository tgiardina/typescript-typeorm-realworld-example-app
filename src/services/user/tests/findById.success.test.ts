import 'reflect-metadata';
import { assert } from 'chai';
import 'mocha';
import { stub } from 'sinon';

import { UserService } from '../';
import { Result } from '../../../helpers';
import { IUserTokenizable } from '../interfaces';

describe('UserService.findById', () => {
  const id = 1;
  const entity = {
    id,
    username: "username",
    token: null,
  };
  const token = "token";
  let result: Result<IUserTokenizable>;
  let userService: UserService<string>;

  before(async () => {
    const cipher = { tokenize: stub().returns(token) };
    const userRepository = {
      create: null,
      findOne: stub().returns(entity),
      save: null,
    };
    userService = new UserService(userRepository, cipher);
  });

  describe('is passed a valid id', () => {
    it('should run without error', async () => {
      result = await userService.findById(id);
    })

    it('should return an ok result', async () => {
      assert(result.isOk);
    });

    it('should return correct username and id', async () => {
      assert.equal(result.value.id, entity.id);
      assert.equal(result.value.username, entity.username);
    });

    it('should return user with correct token ', async () => {
      assert.equal(result.value.token, token);
    });
  });
}) 
