import { Request, Response } from 'express';
import { body } from 'express-validator';
import { inject } from 'inversify';
import {
  controller,
  httpPost,
  interfaces,
} from 'inversify-express-utils';

import { TYPES } from '../../../constants/';
import { IArticleService } from './interfaces';
import { auth, validate } from '../../middleware';

@controller('/api/articles')
export class ArticleController implements interfaces.Controller {
  constructor(
    @inject(TYPES.ArticleService) private service: IArticleService,
  ) { }

  @httpPost(
    '',
    body('article.slug').matches("[a-z\-]+"),
    body('article.title').isString(),
    body('article.description').isString(),
    body('article.body').isString(),
    body('article.tagList').isArray().optional(),
    validate,
    auth.required,
  )
  public async create(req: Request, res: Response) {
    const article = await this.service.createAndSave(req.body.userId, {
      slug: req.body.article.slug,
      title: req.body.article.title,
      description: req.body.article.description,
      body: req.body.article.body,
      tagList: req.body.article.tagList
    });
    res.status(201).json({
      article: {
        slug: article.slug,
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tags.map(tag => tag.tag),
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
        favorited: false,
        favoritesCount: 0,
        author: {
          bio: article.author.bio || "",
          following: false,
          image: article.author.image || "",
          username: article.author.username,
        }
      },
    });
  }
}
