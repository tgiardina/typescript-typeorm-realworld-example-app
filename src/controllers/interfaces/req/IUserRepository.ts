import { IUserRo, IUserServiceCreateReq } from './';

export interface IUserRepository {
  createAndSaveAuth: (user: IUserServiceCreateReq) => Promise<IUserRo>;
}
