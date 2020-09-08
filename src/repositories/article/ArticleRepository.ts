import { EntityRepository, Repository } from 'typeorm';

import { IArticleSeed, IArticleRepository } from './interfaces';
import { ArticleEntity } from './ArticleEntity';

@EntityRepository(ArticleEntity)
export class ArticleRepository extends Repository<ArticleEntity> implements IArticleRepository {
  createAndSave(article: IArticleSeed): Promise<ArticleEntity> {
    return this.save(this.create(article));
  }
}
