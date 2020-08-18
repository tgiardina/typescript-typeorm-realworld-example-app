import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "../entities";

import { IUserResponseDto } from '../controllers';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async createAndSaveDto(data: UserEntity): Promise<IUserResponseDto> {
    const user = this.create(data);
    await this.save(user);
    return user.toDto();
  }

  async findOneDto(id: number): Promise<IUserResponseDto> {
    const user = await this.findOne(id);
    return user && user.toDto();
  }
}
