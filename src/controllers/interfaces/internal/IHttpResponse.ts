export interface IHttpResponse<T> {
  body: T,
  json: (data: T) => void;
  status: (code: number) => IHttpResponse<T>;
}
