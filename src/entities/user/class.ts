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
