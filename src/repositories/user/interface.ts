import { IUserDto, IUserModel } from '../../models';

export interface IUserRepository {
  create: (data: IUserDto) => IUserModel;
  save: (user: IUserModel) => Promise<IUserModel>;
}
