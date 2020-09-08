import { ITagRo } from './';

export interface ITagRepository {
  findOrCreate(tag: string): ITagRo;
}
