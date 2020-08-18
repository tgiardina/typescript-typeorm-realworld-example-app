import { IUserCreateDto, IUserResponseDto } from '../../../interfaces';

export interface IUserRepository {
  create: (data: any) => any;
  // create: (data: IUserCreateDto) => IUserResponseDto;  
  findOne: (id: number) => Promise<any>; //Promise<IUserResponseDto>;
  save: (data: any) => Promise<any>; //Promise<IUserResponseDto>;
  // save: (data: IUserCreateDto) => Promise<IUserResponseDto>;  
}

