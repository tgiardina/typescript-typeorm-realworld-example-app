import { IUserModel } from '../../models';

export interface IUserRepository {
  create: (data: IUserModel) => IUserModel;
  save: (user: IUserModel) => Promise<IUserModel>;
}
