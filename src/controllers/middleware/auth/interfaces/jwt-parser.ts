import { IUserDto } from '../../../../models';

export interface IJwtParser {
  verify: (token: string) => IUserDto;
}
