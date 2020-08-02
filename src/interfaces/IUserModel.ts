import { IUserData } from './';

export interface IUserModel extends IUserData {
  save: () => Promise<IUserModel>;
}
