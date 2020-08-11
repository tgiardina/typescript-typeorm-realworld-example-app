export interface IBaseResponse<T> {
  json: (res: T) => void;
  status: (status: number) => IBaseResponse<T>;
}
