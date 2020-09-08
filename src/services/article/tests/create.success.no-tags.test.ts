import 'reflect-metadata';
import 'mocha';
import { assert } from 'chai';
import { stub } from 'sinon';

import { ArticleService } from '../';
import { IArticleRo } from '../interfaces';

describe('ArticleService.create - success', () => {
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
  const articleSeedIn = {
    slug: "url-slug",
    title: "Title",
    description: "I talk.",
    body: "Hello, my name is John.",
  };
  const articleSeedOut = {
    ...articleSeedIn,
    tagList: null,
    tags: [],
  };
  const article = {
    ...articleSeedIn,
    createdAt: new Date(),
    updatedAt: new Date(),
    favorited: false,
    favoritesCount: 0,
    author: user,
    tagList: [],
  };
  let result: IArticleRo;
  // Stubs
  const articleStub = stub().returns(article);
  const articleRepo = {
    createAndSave: articleStub,
  };
  const userStub = stub().returns(user);
  const tagStub = stub();
  const tagRepo = {
    findOrCreate: tagStub,
  };
  const userRepo = {
    findOne: userStub,
  };
  const service = new ArticleService(articleRepo, tagRepo, userRepo);

  describe('is passed an article seed', () => {
    it('should run without error', async () => {
      result = await service.createAndSave(user.id, articleSeedIn);
    })

    it('should have called userRepo.findOne correctly', async () => {
      assert.equal(userStub.getCall(0).args[0], user.id);
    });

    it('should not have called tagRepo.findOrCreate', async () => {
      assert(tagStub.notCalled);
    });

    it('should have called articleRepo.createAndSave correctly', async () => {
      assert.equal(articleStub.getCall(0).args[0], articleSeedOut);
    });

    it('should have correct result', async () => {
      assert.equal(result, article);
    });
  });
}) 
