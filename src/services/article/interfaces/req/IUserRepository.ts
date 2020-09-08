import { IUser } from './';
import { IProfileRo } from '../spec';

export interface IUserRepository {
  findOne(id: number): Promise<IUser | undefined>;
}
