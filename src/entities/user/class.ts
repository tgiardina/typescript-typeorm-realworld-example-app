import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IUserResponseDto } from '../../controllers';
import { IJwtCipher } from './interfaces';

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
  // Dependencies
  private cipher: IJwtCipher

  constructor(data: UserEntity, cipher: IJwtCipher) {
    super();
    Object.assign(this, data);
    this.cipher = cipher;
  }

  generateToken(): string {
    return this.cipher.tokenize({
      id: this.id,
      username: this.username,
    });
  }

  toDto(): IUserResponseDto {
    return {
      id: this.id,
      username: this.username,
      token: this.generateToken(),
    }
  }
}
