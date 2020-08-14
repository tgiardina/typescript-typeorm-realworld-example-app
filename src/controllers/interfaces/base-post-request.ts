import { IUserDto } from '../../models';

export interface IBasePostRequest<T> {
  body: { [key: string]: T, };
  headers: { [key: string]: string | string[], };
  locals: { [user: string]: IUserDto, };
}
