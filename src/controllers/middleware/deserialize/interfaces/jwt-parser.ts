import { IUserResponseDto } from '../../../interfaces';

export interface IJwtParser {
  deserialize: (token: string) => IUserResponseDto;
}
