import { inject, injectable } from 'inversify';
import { getRepository, Repository } from "typeorm";
import { UserEntity } from "../../entities";

import { TYPES } from '../../constants';
import { IJwtCipher } from './interfaces';

@injectable()
export class UserRepository {
  private repository: Repository<UserEntity>;

  constructor(@inject(TYPES.JwtCipher) private cipher: IJwtCipher) {
    this.repository = getRepository(UserEntity);
  }

  create(data: UserEntity): UserEntity {
    return this.repository.create(data);
  }

  async createAndSave(data: UserEntity): Promise<UserEntity> {
    const user = this.repository.create(data);
    return this.repository.save(user);
  }

  async createAndSaveAuthorized(data: UserEntity): Promise<UserEntity> {
    const user = this.repository.create(data);
    return this.authorize(await this.repository.save(user));
  }

  async findOne(id: number): Promise<UserEntity> {
    return this.repository.findOne(id);
  }

  async findOneAuthorized(id: number): Promise<UserEntity> {
    return this.authorize(await this.repository.findOne(id));
  }

  async save(user: UserEntity): Promise<UserEntity> {
    return this.repository.save(user);
  }

  ////////////////////////////////////////////////////////////////////////////
  // Private
  ////////////////////////////////////////////////////////////////////////////

  private authorize(user: UserEntity): UserEntity {
    user.authorize(this.cipher);
    return user;
  }
}
