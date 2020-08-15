import { IUserEntity } from './';

export interface IUserRepository<T> {
  create: (data: T) => IUserEntity;
  findOne: (id: number) => Promise<IUserEntity>;
  save: (user: IUserEntity) => Promise<IUserEntity>;
}

