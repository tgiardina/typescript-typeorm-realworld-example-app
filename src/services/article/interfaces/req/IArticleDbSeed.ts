import { IProfileRo } from '../spec';
import { ITagRo } from './';

export interface IArticleDbSeed {
  slug: string;
  title: string;
  description: string;
  body: string;
  author: IProfileRo,
  tags: ITagRo[],
}
