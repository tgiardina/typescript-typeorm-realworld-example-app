import { IProfile } from '../../interfaces';

export interface IArticle {
  article: {
    slug: string;
    title: string;
    body: string;
    tagList: string[];
    createdAt: Date;
    updatedAt: Date;
    favorited: boolean;
    favoritesCount: number;
    author: IProfile;
  }
}
