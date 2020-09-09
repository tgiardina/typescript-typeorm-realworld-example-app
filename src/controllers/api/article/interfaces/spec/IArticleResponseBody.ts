import { IProfileRo } from '../../../interfaces';

export interface IArticleResponseBody {
  article: {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: Date;
    updatedAt: Date;
    favorited: boolean;
    favoritesCount: number;
    author: IProfileRo;
  }
}
