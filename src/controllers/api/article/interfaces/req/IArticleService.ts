import { IArticlePostBody } from '../spec';
import { IArticleRo } from './';

export interface IArticleService {
  createAndSave(article: IArticlePostBody): Promise<IArticleRo>;
}
