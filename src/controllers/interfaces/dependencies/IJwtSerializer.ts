import { IDecodedToken } from './';

export interface IJwtSerializer {
  serialize: (user: IDecodedToken) => string;
}
