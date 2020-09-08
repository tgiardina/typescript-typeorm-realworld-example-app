import { ITagRo, IUser } from '.';

export interface IArticleDbRo {
  slug: string;
  title: string;
  description: string;
  body: string;
  tags: ITagRo[]
  createdAt: Date;
  updatedAt: Date;
  favoritesCount: number;
  author: IUser;
}
