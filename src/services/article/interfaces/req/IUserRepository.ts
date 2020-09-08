import { IProfileRo } from '../spec';

export interface IUserRepository {
  findOne(id: number): IProfileRo;
}
