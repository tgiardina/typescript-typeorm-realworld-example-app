export interface IBaseResponse {
  json: (res: string | { [key: string]: any, }) => void;
  locals: { [key: string]: any, };
  status: (status: number) => IBaseResponse;
}
