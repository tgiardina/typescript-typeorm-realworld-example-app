import { Container } from 'inversify';
import { sign, verify } from 'jsonwebtoken';

import '../controllers';
import { TYPES } from '../constants';
import {
  DeserializeMiddleware,
  SerializeMiddleware,
  IJwtCipher,
  IJwtParser,
  IUserRepository,
  IUserResponseDto,
} from '../controllers'
import { UserRepository } from '../repositories';

export function loadContainer(): Container {
  const container = new Container();
  // Middleware
  container
    .bind<DeserializeMiddleware>(TYPES.DeserializeMiddleware)
    .to(DeserializeMiddleware);
  container
    .bind<SerializeMiddleware>(TYPES.SerializeMiddleware)
    .to(SerializeMiddleware);
  // Repositories
  container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
  // Tokens
  container
    .bind<IJwtCipher>(TYPES.JwtCipher)
    .toConstantValue({
      serialize: (data: Record<string, unknown>) => {
        return sign(data, process.env.JWT_SECRET);
      },
    });
  container
    .bind<IJwtParser>(TYPES.JwtParser)
    .toConstantValue({
      deserialize: (token: string) => {
        return <IUserResponseDto>verify(token, process.env.JWT_SECRET);
      }
    });

  return container;
}
