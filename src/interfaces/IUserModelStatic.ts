import { IUserData, IUserModel } from './';

export interface IUserModelStatic {
  create: (data: IUserData) => IUserModel;
}
