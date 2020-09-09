import { inject, injectable } from 'inversify';
import { getRepository, Repository } from "typeorm";
import { UserEntity } from "./UserEntity";

import { TYPES } from '../../constants';
import { IJwtCipher, IUserRepository, IUserSeed } from './interfaces';

@injectable()
export class UserRepository implements IUserRepository {
  private repository: Repository<UserEntity>;

  constructor(@inject(TYPES.JwtCipher) private cipher: IJwtCipher) {
    this.repository = getRepository(UserEntity);
  }

  async createAndSaveAuth(data: IUserSeed): Promise<UserEntity> {
    const user = this.repository.create(data);
    return this.authorize(await this.repository.save(user));
  }

  async findOne(id: number): Promise<UserEntity | undefined> {
    return this.repository.findOne(id);
  }

  ////////////////////////////////////////////////////////////////////////////
  // Private
  ////////////////////////////////////////////////////////////////////////////

  private authorize(user: UserEntity): UserEntity {
    user.authorize(this.cipher);
    return user;
  }
}
