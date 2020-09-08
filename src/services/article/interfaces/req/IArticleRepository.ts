import { IProfile } from '../spec';

export interface IArticleRepository {
  findOne(id: number): IProfile;
}
