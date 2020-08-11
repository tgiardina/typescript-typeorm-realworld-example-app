export interface IBaseRequest {
  body: { [key: string]: any, };
  headers: { [key: string]: any, };
  locals: { [key: string]: any, };
}
