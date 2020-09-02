import { IUserRo, IUserPostBody } from '../';

export interface IUserRepository {
  createAndSaveAuth: (user: IUserPostBody) => Promise<IUserRo>;
}
