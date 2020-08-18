import { IUserCreateDto, IUserResponseDto } from '../../../interfaces';

export interface IUserRepository {
  createAndSaveDto: (data: IUserCreateDto) => Promise<IUserResponseDto>;
  findOneDto: (id: number) => Promise<IUserResponseDto>;
}

