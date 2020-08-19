import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IUserResponseDto } from '../../controllers';

@Entity("user")
export class UserEntity extends BaseEntity {
  // Columns
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

  toDto(): IUserResponseDto {
    return {
      id: this.id,
      username: this.username,
    }
  }
}
