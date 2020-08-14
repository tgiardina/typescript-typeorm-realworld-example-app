import { IUserDto } from '../../models';

export interface IBaseRequest {
  headers: { [key: string]: string | string[], };
  locals: { [user: string]: IUserDto, };
}
