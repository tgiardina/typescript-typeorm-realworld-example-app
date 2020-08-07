export interface IUserDto {
  id?: number;
  joined?: Date;
  lastLogin?: Date;
  username: string;
  createdAt?: Date;
  updatedAt?: Date;
  token: string;
}

export interface IUserModel {
  id?: number;
  joined?: Date;
  lastLogin?: Date;
  username: string;
  createdAt?: Date;
  updatedAt?: Date;
  toDto: () => IUserDto;
}
