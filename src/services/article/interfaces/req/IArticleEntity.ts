import { ITagEntity, IUserEntity } from '.';

export interface IArticleEntity {
  slug: string;
  title: string;
  description: string;
  body: string;
  tags: ITagEntity[];
  createdAt: Date;
  updatedAt: Date;
  favoritesCount: number;
  author: IUserEntity;
}
