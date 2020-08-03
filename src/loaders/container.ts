import { Container } from 'inversify';
import { getRepository } from 'typeorm';

import '../controllers';
import { TYPES } from '../constants';
import { IUserRepository } from '../interfaces';
import { UserModel } from '../models';
import { UserService, IUserService } from '../services';

export function loadContainer(): Container {
  const container = new Container();
  container.bind<IUserRepository>(TYPES.UserRepository).toDynamicValue(() => {
    return getRepository(UserModel);
  });
  container.bind<IUserService>(TYPES.UserService).to(UserService);
  return container;
}
