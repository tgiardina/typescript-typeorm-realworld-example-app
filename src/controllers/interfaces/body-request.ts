import { IUserResponseDto } from './';

export interface IBodyRequest<T> {
  body: T;
  headers: { [key: string]: string | string[], };
  locals: { [user: string]: IUserResponseDto, };
}
