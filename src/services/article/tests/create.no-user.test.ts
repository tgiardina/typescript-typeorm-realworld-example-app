import 'reflect-metadata';
import 'mocha';
import { assert } from 'chai';
import { stub } from 'sinon';

import { ArticleService } from '../';
import { IArticleRo } from '../interfaces';

describe('ArticleService.create - success', () => {
  // Data
  const tag1 = {
    id: 1,
    tag: "tag1",
  };
  const tag2 = {
    id: 2,
    tag: "tag2",
  };
  const articleSeedIn = {
    userId: 1,
    slug: "url-slug",
    title: "Title",
    description: "I talk.",
    body: "Hello, my name is John.",
    tagList: [tag1.tag, tag2.tag],
  };
  let result: { code: string };
  // Stubs
  const articleStub = stub();
  const articleRepo = {
    createAndSave: articleStub,
  };
  const userStub = stub().returns(null);
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

  describe('is passed an article seed', () => {
    it('should error', async () => {
      try {
        service.create(articleSeedIn);
        assert(false);
      } catch (err) {
        result = err;
      }
    })

    it('should have called userRepo.findOne correctly', async () => {
      assert.equal(userStub.getCall(0).args[0], articleSeedIn.userId);
    });

    it('should have correct result', async () => {
      assert.equal(result, { code: "ER_INVALID_TOKEN" });
    });
  });
}) 
