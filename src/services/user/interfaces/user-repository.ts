import { IUserTokenizable } from './';

export interface IUserRepository<T> {
  create: (data: T) => IUserTokenizable;
  findOne: (id: number) => Promise<IUserTokenizable>;
  save: (user: IUserTokenizable) => Promise<IUserTokenizable>;
}

