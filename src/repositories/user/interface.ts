import { IUserDto, IUserModel } from '../../models';

export interface IUserRepository {
  create: (data: IUserDto) => IUserModel;
  findOne: (id: number) => Promise<IUserModel>;
  save: (user: IUserModel) => Promise<IUserModel>;
}
