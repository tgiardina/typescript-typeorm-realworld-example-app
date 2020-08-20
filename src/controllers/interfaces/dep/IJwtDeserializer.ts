import { IDecodedToken } from './';

export interface IJwtDeserializer {
  deserialize: (token: string) => IDecodedToken;
}
