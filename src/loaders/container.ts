import { Container } from 'inversify';
import { sign, verify } from 'jsonwebtoken';

import '../controllers';
import { TYPES } from '../constants';
import {
  AuthMiddleware,
  IJwtParser,
  IUserRepository,
  IUserResponseDto,
} from '../controllers'
import { IJwtCipher } from '../entities';
import { UserRepository } from '../repositories';

export function loadContainer(): Container {
  const container = new Container();
  // Middleware
  container.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware);
  // Repositories
  container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
  // Tokens
  container
    .bind<IJwtCipher>(TYPES.JwtCipher)
    .toConstantValue({
      tokenize: (data: Record<string, unknown>) => {
        return sign(data, process.env.JWT_SECRET);
      },
    });
  container
    .bind<IJwtParser>(TYPES.JwtParser)
    .toConstantValue({
      verify: (token: string) => {
        return <IUserResponseDto>verify(token, process.env.JWT_SECRET);
      }
    });

  return container;
}
