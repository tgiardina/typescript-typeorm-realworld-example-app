import { Application } from 'express';
import { Container } from 'inversify';

import { TYPES } from '../constants';
import { IUserService } from '../interfaces';
import { UserService } from '../services';
import initUser from './user';

export default function init(app: Application, container: Container): void {
  initUser(app, container.get<IUserService>(TYPES.UserService));
}
