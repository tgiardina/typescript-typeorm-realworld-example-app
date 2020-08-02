import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IUserModel } from '../interfaces';

@Entity("user")
export class UserModel extends BaseEntity implements IUserModel {
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
}
