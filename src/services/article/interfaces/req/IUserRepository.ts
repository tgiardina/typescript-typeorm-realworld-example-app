import { IUserEntity } from './';

export interface IUserRepository {
  findOne(id: number): Promise<IUserEntity | undefined>;
}
