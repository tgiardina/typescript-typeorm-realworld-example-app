import { assert, expect, request } from 'chai';
import { Application, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { Connection } from 'typeorm';

import '../../../loaders';
import initApp from '../../../../src/app';
import {
  IArticle,
  IArticleDbSchema,
  IArticleTagJoinDbSchema,
  ITagDbSchema,
} from '../interfaces';
import { initConnection } from '../../../utils';

describe('POST /api/articles - success w/ preexisting tags', () => {
  const user = {
    id: 1,
    email: "username@example.com",
    password: "password",
    username: "username",
  };
  const profile = {
    username: user.username,
    bio: "",
    image: "",
    following: false,
  };
  const token = sign({ id: user.id }, <string>process.env.JWT_SECRET);
  const article = {
    slug: "a-slug",
    title: "A Title",
    description: "This is an article.",
    body: "A discussion about something.",
    tagList: ["tag1", "tag2"],
  };
  const data = { article };
  let app: Application;
  let body: IArticle;
  let connection: Connection;
  let response: Response;
  let status: number;

  before(async () => {
    app = await initApp();
    connection = await initConnection();
    await connection.manager.query(
      `INSERT INTO user VALUES(\n\
        DEFAULT,\n\
        DEFAULT,\n\
        "${user.email}",\n\
        DEFAULT,\n\
        "${user.password}",\n\
        "${user.username}",\n\
        DEFAULT,\n\
        DEFAULT\n\
       );`
    );
    await connection.manager.query(
      `INSERT INTO tag VALUES(\n\
        DEFAULT,\n\
        "${article.tagList[0]}",\n\
        DEFAULT,\n\
        DEFAULT\n\
       );`
    );
  });

  after(async () => {
    await connection.close();
  });

  it('should run.', (done) => {
    request(app)
      .post('/api/articles')
      .set({ "Authorization": `Bearer ${token}` })
      .type('json')
      .send(data)
      .end((_err, res) => {
        response = res;
        body = res.body;
        status = res.status;
        done();
      });
  });

  it('should match OpenApi spec', () => {
    expect(response).to.satisfyApiSpec;
  });

  it('should have a 201 status', () => {
    assert.equal(status, 201);
  });

  it('should include properties.', () => {
    assert.equal(body.article.slug, article.slug);
    assert.equal(body.article.title, article.title);
    assert.equal(body.article.body, article.body);
    assert.deepEqual(body.article.tagList, article.tagList);
    assert.equal(body.article.favorited, false);
    assert.equal(body.article.favoritesCount, 0);
    assert.deepEqual(body.article.author, profile);
  })

  it('should have saved article in the database.', async () => {
    const dbArticle = <IArticleDbSchema>(await connection.manager.query(
      'SELECT * FROM article;'
    ))[0];
    assert.equal(dbArticle.body, article.body);
    assert.equal(dbArticle.description, article.description);
    assert.equal(dbArticle.slug, article.slug);
    assert.equal(dbArticle.title, article.title);
    assert.equal(dbArticle.authorId, 1);
  });

  it('should have saved tags in the database.', async () => {
    const dbTags = <ITagDbSchema[]>(await connection.manager.query(
      'SELECT * FROM tag;'
    ));
    const dbTagNames = dbTags.map(dbTag => dbTag.tag).sort();
    const tagNames = [...article.tagList].sort();
    assert.equal(dbTagNames.length, tagNames.length);
    while (dbTagNames.length > 0) {
      assert.equal(dbTagNames.pop(), tagNames.pop());
    }
  });

  it('should have associated article with tags in database.', async () => {
    const dbJoins = <IArticleTagJoinDbSchema[]>(await connection.manager.query(
      'SELECT * FROM article_tags_tag;'
    ));
    const dbTagIds = dbJoins.map(dbJoin => dbJoin.tagId).sort();
    const tagIds = [1, 2];
    assert.equal(dbJoins.length, tagIds.length);
    while (dbJoins.length > 0) {
      // eslint-disable-next-line      
      const currJoin = dbJoins.pop()!;
      assert(tagIds.includes(currJoin.tagId));
      assert.equal(dbTagIds.pop(), tagIds.pop());
    }
  });
})
