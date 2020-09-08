import { IArticleRo, IArticleSeed } from '../spec';

export interface IArticleRepository {
  createAndSave(seed: IArticleSeed): IArticleRo;
}
