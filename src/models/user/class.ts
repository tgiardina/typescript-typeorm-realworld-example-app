import { sign } from 'jsonwebtoken';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IUserDto } from './';

@Entity("user")
export class UserModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  joined: Date;
  @Column()
  lastLogin: Date;
  @Column()
  username: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  constructor(data: IUserDto) {
    super();
    Object.assign(this, data);
  }

  toDto(): IUserDto {
    return {
      id: this.id,
      username: this.username,
      token: sign({ id: this.id }, process.env.JWT_SECRET),
    };
  }
}
