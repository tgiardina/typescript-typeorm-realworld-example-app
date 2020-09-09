import { IArticleRo, IArticleSeed } from './';

export interface IArticleService {
  createAndSave(userId: number, article: IArticleSeed): Promise<IArticleRo>;
}
