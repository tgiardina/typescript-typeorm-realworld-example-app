import { EntityRepository, Repository } from "typeorm";

import { IUserEntity, IUserServiceCreateReq } from './interfaces';

@EntityRepository(IUserEntity)
export class UserRepository extends Repository<IUserEntity> {
  async createAndSaveDto(data: IUserServiceCreateReq): Promise<IUserEntity> {
    const user = this.create(data);
    return this.save(user);
  }
}
