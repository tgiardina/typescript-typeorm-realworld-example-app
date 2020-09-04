import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserEntity } from '../user';

@Entity("article")
export class ArticleEntity extends BaseEntity {
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
  @ManyToOne(_type => UserEntity, user => user.articles)
  author: UserEntity;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
