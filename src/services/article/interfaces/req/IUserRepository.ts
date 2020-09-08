import { IProfile } from '../spec';

export interface IUserRepository {
  findOne(id: number): IProfile;
}
