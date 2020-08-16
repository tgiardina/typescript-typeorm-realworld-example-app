import 'reflect-metadata';
import { assert } from 'chai';
import 'mocha';
import { stub, SinonStub } from 'sinon';

import { UserService } from '../';
import { Result } from '../../../helpers';
import { IUserTokenizable } from '../interfaces';

describe('UserService.create', () => {
  const input = "input";
  const entity = {
    id: 1,
    username: "username",
  };
  const token = "token";
  let result: Result<IUserTokenizable>;
  let saveStub: SinonStub;
  let userService: UserService<string>;

  before(async () => {
    const cipher = { tokenize: stub().returns(token) };
    const userRepository = {
      create: stub().returns(entity),
      findOne: null,
      save: saveStub = stub(),
    };
    userService = new UserService(userRepository, cipher);
  });

  describe('is passed valid data', () => {
    it('should run without error', async () => {
      result = await userService.create(input);
    })

    it('should return an ok result', async () => {
      assert(result.isOk);
    });

    it('should return correct username and id', async () => {
      assert.equal(result.value.id, entity.id);
      assert.equal(result.value.username, entity.username);
    });

    it('should return correct token', async () => {
      assert.equal(result.value.token, token);
    });

    it('should have called `save` with entity', async () => {
      assert(saveStub.calledOnce);
      const args = saveStub.args[0];
      assert.equal(args.length, 1);
      const user = args[0];
      assert.equal(user, entity);
    })
  });
}) 
