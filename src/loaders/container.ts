import { Container } from 'inversify';
import { sign, verify } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';

import '../controllers';
import { TYPES } from '../constants';
import {
  SerializeMiddleware,
  IDecodedToken,
  IJwtDeserializer,
  IJwtSerializer,
  IUserRepository,
} from '../controllers'
import { UserRepository } from '../repositories';

export function loadContainer(): Container {
  const container = new Container();
  // Middleware
  container
    .bind<SerializeMiddleware>(TYPES.SerializeMiddleware)
    .to(SerializeMiddleware);
  // Repositories
  container
    .bind<IUserRepository>(TYPES.UserRepository)
    .toConstantValue(getCustomRepository(UserRepository));
  // Tokens
  container
    .bind<IJwtSerializer>(TYPES.JwtCipher)
    .toConstantValue({
      serialize: (data: string | object) => {
        return sign(data, process.env.JWT_SECRET);
      },
    });
  container
    .bind<IJwtDeserializer>(TYPES.JwtParser)
    .toConstantValue({
      deserialize: (token: string) => {
        return <IDecodedToken>verify(token, process.env.JWT_SECRET);
      }
    });

  return container;
}
