import { IUser, IUserModel, IUserRepository } from './';
import { Result } from '../helpers';

export interface IUserService {
  create: (data: IUser) => Promise<Result<IUserModel>>;
}
