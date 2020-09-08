import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ITagRo } from './interfaces';
import { ArticleEntity } from '../article';

@Entity("tag")
export class TagEntity extends BaseEntity implements ITagRo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false, unique: true })
  tag: string;
  @ManyToMany(_type => ArticleEntity, article => article.tags)
  articles: ArticleEntity[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
