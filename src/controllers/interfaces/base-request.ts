import { IUserDto } from '../../models';

export interface IBaseRequest<T> {
  body: { [key: string]: T, };
  headers: { [key: string]: string | string[], };
  locals: { [user: string]: IUserDto, };
}
