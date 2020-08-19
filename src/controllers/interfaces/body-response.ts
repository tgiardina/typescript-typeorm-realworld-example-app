import { IBaseResponse } from './';

export interface IBodyResponse<T> extends IBaseResponse {
  json: (body: T) => IBodyRequest<T>;
  status: (n: number) => IBodyResponse<T>;
}
