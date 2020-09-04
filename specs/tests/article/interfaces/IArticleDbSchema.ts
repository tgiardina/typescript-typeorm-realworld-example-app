export interface IArticleDbSchema {
  id: number;
  body: string;
  description: string;
  slug: string;
  title: string;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
}
