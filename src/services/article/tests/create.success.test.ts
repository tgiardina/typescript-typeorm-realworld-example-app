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
  const articleSeedOut = {
    ...articleSeedIn,
    tagList: null,
    tags: [tag1.id, tag2.id],
  };
  const article = {
    ...articleSeedIn,
    createdAt: new Date(),
    updatedAt: new Date(),
    favorited: false,
    favoritesCount: 0,
    author: user,
  }
  let result: IArticleRo;
  // Stubs
  const articleStub = stub().returns(article);
  const articleRepo = {
    createAndSave: articleStub,
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

  describe('is passed an article seed', () => {
    it('should run without error', async () => {
      result = await service.createAndSave(user.id, articleSeedIn);
    })

    it('should have called userRepo.findOne correctly', async () => {
      assert.equal(userStub.getCall(0).args[0], user.id);
    });

    it('should have called tagRepo.findOrCreate correctly', async () => {
      assert.equal(tagStub.getCall(0).args[0], tag1);
      assert.equal(tagStub.getCall(1).args[0], tag2);
    });

    it('should have called articleRepo.createAndSave correctly', async () => {
      assert.equal(articleStub.getCall(0).args[0], articleSeedOut);
    });

    it('should have correct result', async () => {
      assert.equal(result, article);
    });
  });
}) 
