import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IJwtCipher, IUserRo } from './interfaces';
import { ArticleEntity } from '../article';

@Entity("user")
export class UserEntity extends BaseEntity implements IUserRo {
  // Columns
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  bio: string;
  @Column({ nullable: false, unique: true })
  email: string;
  @Column()
  image: string;
  @Column({ nullable: false })
  password: string;
  @Column({ nullable: false, unique: true })
  username: string;
  @OneToMany(() => ArticleEntity, article => article.author)
  articles: ArticleEntity[]
  @ManyToMany(() => ArticleEntity, article => article.fans)
  @JoinTable()
  favorites: ArticleEntity[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  // Dependencies
  private cipher: IJwtCipher

  authorize(cipher: IJwtCipher): void {
    this.cipher = cipher;
  }

  get token(): string {
    return this.cipher.tokenize({
      id: this.id,
      email: this.email,
      password: this.password,
    });
  }
}
