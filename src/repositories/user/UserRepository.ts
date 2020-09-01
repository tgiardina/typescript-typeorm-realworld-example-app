import { EntityRepository, Repository } from "typeorm";

import {
  IUserEntity,
  IUserRepository,
  IUserServiceCreateReq,
} from './interfaces';

@EntityRepository(IUserEntity)
export class UserRepository extends Repository<IUserEntity> {
  async createAndSave(data: IUserServiceCreateReq): Promise<IUserEntity> {
    const user = this.create(data);
    return this.save(user);
  }
}
