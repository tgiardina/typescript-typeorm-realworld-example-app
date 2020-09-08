import {
  IArticleRepository,
  IArticleRo,
  IArticleSeed,
  ITagRepository,
  IUserRepository,
} from './interfaces';

export class ArticleService {
  constructor(
    articleRepository: IArticleRepository,
    tagRepository: ITagRepository,
    userRepository: IUserRepository,
  ) {
  }

  create(seed: IArticleSeed): IArticleRo {
    return
  }
}
