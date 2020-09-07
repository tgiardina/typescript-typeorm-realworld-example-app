import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ArticleEntity } from '../article';

@Entity("tag")
export class TagEntity extends BaseEntity {
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
