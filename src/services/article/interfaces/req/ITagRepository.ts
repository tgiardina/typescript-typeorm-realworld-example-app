import { ITagRo } from './';

export interface ITagRepository {
  findOrCreate(tag: ITagRo): Promise<ITagRo>;
}
