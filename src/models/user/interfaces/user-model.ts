import { IUserDto } from './';

export interface IUserModel {
  id?: number;
  joined?: Date;
  lastLogin?: Date;
  username: string;
  createdAt?: Date;
  updatedAt?: Date;
  toDto: () => IUserDto;
}

