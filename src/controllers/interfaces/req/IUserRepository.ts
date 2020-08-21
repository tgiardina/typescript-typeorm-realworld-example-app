import { IUserRo, IUserServiceCreateReq } from './';

export interface IUserRepository {
  createAndSave: (user: IUserServiceCreateReq) => Promise<IUserRo>;
  findOne: (id: number) => Promise<IUserRo>;
}
