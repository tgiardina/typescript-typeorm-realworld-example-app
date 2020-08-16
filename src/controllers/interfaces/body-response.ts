import { IBaseResponse } from './';

export interface IBodyResponse<T> extends IBaseResponse {
  json: (body: T) => IBodyResponse<T>;
  status: (status: number) => IBodyResponse<T>;
}
