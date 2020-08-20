import { IDecodedToken } from '../';

export type IVerifiedHttpReq<T extends {}> = T & {
  locals: { token: IDecodedToken },
}
