export interface IBasicResponse {
  json: (res: string | { [key: string]: any, }) => void;
  locals: { [key: string]: any, };
  status: (status: number) => IBasicResponse;
}
