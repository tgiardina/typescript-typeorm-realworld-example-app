import { IUserDto } from './';

export interface IBodyRequest {
  body: { [key: string]: string | number, };
  headers: { [key: string]: string | string[], };
  locals: { [user: string]: IUserDto, };
}
