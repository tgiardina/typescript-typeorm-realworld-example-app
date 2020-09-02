import { Container } from 'inversify';
import { sign, verify } from 'jsonwebtoken';

import '../controllers';
import { TYPES } from '../constants';
import {
  IDecodedToken,
  IJwtDeserializer,
  IJwtSerializer,
  IUserRepository,
} from '../controllers'
import { UserRepository } from '../repositories';

export function loadContainer(): Container {
  const container = new Container();
  // Repositories
  container
    .bind<IUserRepository>(TYPES.UserRepository)
    .to(UserRepository);
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
