import { IUserDto } from './';
import { Result } from '../../../../helpers';

export interface IUserService {
  create: (data: IUserDto) => Promise<Result<IUserDto>>;
  findById: (id: number) => Promise<Result<IUserDto>>;
}

