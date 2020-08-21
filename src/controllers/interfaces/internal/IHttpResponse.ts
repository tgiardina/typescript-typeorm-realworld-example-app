export interface IHttpResponse<T> {
  body: T,
  json: (data: T) => IHttpResponse<T>;
  status: (code: number) => IHttpResponse<T>;
}
