import { IProfileRo } from '../../../interfaces';

export interface IArticleRo {
  slug: string;
  title: string;
  description: string;
  body: string;
  tags: { tag: string }[];
  createdAt: Date;
  updatedAt: Date;
  favorited: boolean;
  favoritesCount: number;
  author: IProfileRo;
}
