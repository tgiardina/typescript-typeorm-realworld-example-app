import { ITag } from './';

export interface ITagRepository {
  findOrCreate(tag: string): ITag;
}
