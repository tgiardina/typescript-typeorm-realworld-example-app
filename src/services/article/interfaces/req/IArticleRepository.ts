import { IArticleDbRo, IArticleDbSeed } from './';

export interface IArticleRepository {
  createAndSave(seed: IArticleDbSeed): Promise<IArticleDbRo>;
}
