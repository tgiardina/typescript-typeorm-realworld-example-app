import { IUserResponseDto } from './';

export interface IBaseRequest {
  headers: { [key: string]: string | string[], };
  locals: { [user: string]: IUserResponseDto, };
}
