import { IProfile } from '../../interfaces';

export interface IArticle {
  slug: string;
  title: string;
  body: string;
  tagList: string[];
  createdAt: Date;
  updatedAt: Date;
  favorited: boolean;
  favoriteCounts: number;
  author: IProfile;
}
