import { inject, injectable } from 'inversify';

import { TYPES } from '../../constants';
import { ServiceError } from '../errors';
import {
  IArticleRepository,
  IArticleRo,
  IArticleSeed,
  IArticleService,
  IProfileRo,
  ITagRepository,
  ITagRo,
  IUserRepository,
} from './interfaces';

@injectable()
export class ArticleService implements IArticleService {
  constructor(
    @inject(TYPES.ArticleRepository) private articleRepository:
      IArticleRepository,
    @inject(TYPES.TagRepository) private tagRepository:
      ITagRepository,
    @inject(TYPES.UserRepository) private userRepository:
      IUserRepository,
  ) {
  }

  async createAndSave(
    userId: number,
    articleSeed: IArticleSeed,
  ): Promise<IArticleRo> {
    const [author, tags] = await Promise.all([
      <Promise<IProfileRo>>this.userRepository.findOne(userId),
      this.getTags(articleSeed.tagList),
    ]);
    if (!author) throw new ServiceError("ER_INVALID_TOKEN");
    const articleDbSeed = {
      ...articleSeed,
      author,
      tags,
    };
    delete articleDbSeed.tagList;
    return this.articleRepository.createAndSave(articleDbSeed);
  }

  private async getTags(tags?: string[]): Promise<ITagRo[]> {
    if (!tags) return [];
    return Promise.all(tags.map(tag => this.tagRepository.findOrCreate({
      tag
    })));
  }
}
