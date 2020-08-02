import { IUser, IUserModel } from './';

export interface IUserRepository {
  create: (data: IUser) => IUserModel;
  save: (user: IUserModel) => Promise<IUserModel>;
}
