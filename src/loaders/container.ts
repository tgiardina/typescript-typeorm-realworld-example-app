import { Container } from 'inversify';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';

import '../controllers';
import { TYPES } from '../constants';
import { IArticleService } from '../controllers/api/article'
import { IUserRepository } from '../controllers/api/user'
import {
  ArticleRepository,
  TagRepository,
  UserRepository,
} from '../repositories';
import { IJwtCipher } from '../repositories/user';
import { ArticleService } from '../services';
import {
  IArticleRepository,
  ITagRepository,
} from '../services/article'

export function loadContainer(): Container {
  const container = new Container();
  // Repositories
  container
    .bind<IArticleRepository>(TYPES.ArticleRepository)
    .toDynamicValue(() => getCustomRepository(ArticleRepository))
    .inSingletonScope();
  container
    .bind<ITagRepository>(TYPES.TagRepository)
    .toDynamicValue(() => getCustomRepository(TagRepository))
    .inSingletonScope();
  container
    .bind<IUserRepository>(TYPES.UserRepository)
    .to(UserRepository)
    .inSingletonScope();
  // Services
  container
    .bind<IArticleService>(TYPES.ArticleService)
    .to(ArticleService)
    .inSingletonScope();
  // Tokens
  container
    .bind<IJwtCipher>(TYPES.JwtCipher)
    .toConstantValue({
      tokenize: (data: string | object) => {
        return sign(data, <string>process.env.JWT_SECRET);
      },
    });

  return container;
}
