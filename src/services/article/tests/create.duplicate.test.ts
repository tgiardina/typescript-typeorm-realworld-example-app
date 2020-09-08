import 'reflect-metadata';
import 'mocha';
import { assert } from 'chai';
import { stub } from 'sinon';

import { ArticleService } from '../';

describe('ArticleService.create - duplicate', () => {
  // Data
  const profile = {
    username: "username",
    bio: "I like turtles.",
    image: "",
    following: false,
  };
  const user = {
    ...profile,
    id: 1,
  };
  const tag1 = {
    id: 1,
    tag: "tag1",
  };
  const tag2 = {
    id: 2,
    tag: "tag2",
  };
  const articleSeedIn = {
    slug: "url-slug",
    title: "Title",
    description: "I talk.",
    body: "Hello, my name is John.",
    tagList: [tag1.tag, tag2.tag],
  };
  const error = { code: `ER_DUP_ENTRY` };
  let result: { code: string };
  // Stubs
  const articleRepo = {
    createAndSave: stub().throws(error),
  };
  const userStub = stub().returns(user);
  const tagStub = stub();
  tagStub.onCall(0).returns(tag1);
  tagStub.onCall(1).returns(tag2);
  const tagRepo = {
    findOrCreate: tagStub,
  };
  const userRepo = {
    findOne: userStub,
  };
  const service = new ArticleService(articleRepo, tagRepo, userRepo);

  describe('is passed a duplicate article seed', () => {
    it('should error', async () => {
      try {
        await service.createAndSave(user.id, articleSeedIn);
        assert(false);
      } catch (err) {
        result = err;
      }
    })

    it('should have called userRepo.findOne correctly', async () => {
      assert.equal(userStub.getCall(0).args[0], user.id);
    });

    it('should have called tagRepo.findOrCreate correctly', async () => {
      assert.deepEqual(tagStub.getCall(0).args[0], { tag: tag1.tag });
      assert.deepEqual(tagStub.getCall(1).args[0], { tag: tag2.tag });
    });

    it('should have correct result', async () => {
      assert.equal(result, error);
    });
  });
}) 
