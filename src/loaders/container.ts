import { Container } from 'inversify';
import { sign } from 'jsonwebtoken';

import '../controllers';
import { TYPES } from '../constants';
import { IUserRepository } from '../controllers'
import { IJwtCipher, UserRepository } from '../repositories';

export function loadContainer(): Container {
  const container = new Container();
  // Repositories
  container
    .bind<IUserRepository>(TYPES.UserRepository)
    .to(UserRepository)
    .inSingletonScope();
  // Tokens
  container
    .bind<IJwtCipher>(TYPES.JwtCipher)
    .toConstantValue({
      tokenize: (data: string | object) => {
        return sign(data, process.env.JWT_SECRET);
      },
    });

  return container;
}
