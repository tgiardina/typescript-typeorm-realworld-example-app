import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IArticleEntity } from './interfaces';
import { TagEntity } from '../tag';
import { UserEntity } from '../user';

@Entity("article")
export class ArticleEntity extends BaseEntity implements IArticleEntity {
  // Columns
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  body: string;
  @Column({ nullable: false })
  description: string;
  @Column({ nullable: false, unique: true })
  slug: string;
  @Column({ nullable: false })
  title: string;
  @ManyToOne(() => UserEntity, user => user.articles)
  author: UserEntity;
  @ManyToMany(() => UserEntity, user => user.favorites)
  fans: UserEntity[];
  @ManyToMany(() => TagEntity, tag => tag.articles)
  @JoinTable()
  tags: TagEntity[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  // Additional Properties
  favorited: boolean;
  favoritesCount: number;
}
