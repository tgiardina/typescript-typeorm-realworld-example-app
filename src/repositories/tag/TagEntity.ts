import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ITagEntity } from './interfaces';
import { ArticleEntity } from '../article';

@Entity("tag")
export class TagEntity extends BaseEntity implements ITagEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false, unique: true })
  tag: string;
  @ManyToMany(() => ArticleEntity, article => article.tags)
  articles: ArticleEntity[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
