import { Container } from 'inversify';
import { getRepository } from 'typeorm';
import { sign, verify } from 'jsonwebtoken';

import '../controllers';
import { TYPES } from '../constants';
import {
  AuthMiddleware,
  IJwtParser,
  IUserDto,
  IUserService,
} from '../controllers'
import { UserEntity } from '../entities';
import { UserService, IJwtCipher, IUserRepository } from '../services';

export function loadContainer(): Container {
  const container = new Container();
  // Middleware
  container.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware);
  // Repositories
  container
    .bind<IUserRepository<IUserDto>>(TYPES.UserRepository)
    .toConstantValue(getRepository(UserEntity));
  // Services
  container.bind<IUserService>(TYPES.UserService).to(UserService);
  // Tokens
  container
    .bind<IJwtCipher>(TYPES.JwtCipher)
    .toConstantValue({
      tokenize: (data: object) => {
        return sign(data, process.env.JWT_SECRET);
      },
    });
  container
    .bind<IJwtParser>(TYPES.JwtParser)
    .toConstantValue({
      verify: (token: string) => {
        return <IUserDto>verify(token, process.env.JWT_SECRET);
      }
    });

  return container;
}
