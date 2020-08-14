import { Container } from 'inversify';
import { getRepository } from 'typeorm';
import { verify } from 'jsonwebtoken';

import '../controllers';
import { TYPES } from '../constants';
import { AuthMiddleware, IAuthMiddleware, IJwtParser } from '../controllers'
import { UserModel } from '../models';
import { IUserRepository } from '../repositories';

export function loadContainer(): Container {
  const container = new Container();
  // Middleware
  container.bind<IAuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware);
  container
    .bind<IJwtParser>(TYPES.JwtParser)
    .toConstantValue(<IJwtParser>{
      verify: (token: string) => verify(token, process.env.JWT_SECRET),
    });
  // Repositories
  container
    .bind<IUserRepository>(TYPES.UserRepository)
    .toConstantValue(getRepository(UserModel));

  return container;
}
