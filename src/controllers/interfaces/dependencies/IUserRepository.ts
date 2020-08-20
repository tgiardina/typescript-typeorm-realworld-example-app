import { IUserRo, IUserServiceCreateReq } from './';

export interface IUserRepository {
  createAndSave: (user: IUserServiceCreateReq) => IUserRo;
  findOne: (id: number) => IUserRo;
}
