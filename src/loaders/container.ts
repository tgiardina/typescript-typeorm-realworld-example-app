import { Container } from 'inversify';

import { IUserModel } from '../interfaces';
import { UserModel } from '../models';

const container = new Container();
container.bind<IUserModel>("").to(UserModel);
