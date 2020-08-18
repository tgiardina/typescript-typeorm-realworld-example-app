import { IUserDto } from '../../../interfaces';

export interface IJwtParser {
  verify: (token: string) => IUserDto;
}
