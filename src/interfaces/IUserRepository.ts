import { IUserData, IUserModel } from './';

export interface IUserRepository {
  create: (data: IUserData) => IUserModel;
  save: (user: IUserModel) => Promise<IUserModel>;
}
