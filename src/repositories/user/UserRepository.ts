import { inject, injectable } from 'inversify';
import { getRepository, Repository } from "typeorm";
import { UserEntity } from "./UserEntity";

import { TYPES } from '../../constants';
import {
  IJwtCipher,
  IUserRepoViaArticleServ,
  IUserRepoViaUserCont,
} from './interfaces';

@injectable()
export class UserRepository
  implements IUserRepoViaArticleServ, IUserRepoViaUserCont {
  private repository: Repository<UserEntity>;

  constructor(@inject(TYPES.JwtCipher) private cipher: IJwtCipher) {
    this.repository = getRepository(UserEntity);
  }

  create(data: UserEntity): UserEntity {
    return this.repository.create(data);
  }

  async createAndSaveAuth(data: UserEntity): Promise<UserEntity> {
    const user = this.repository.create(data);
    return this.authorize(await this.repository.save(user));
  }

  async findOneAuth(id: number): Promise<UserEntity> {
    return this.authorize(await this.repository.findOne(id));
  }

  ////////////////////////////////////////////////////////////////////////////
  // Private
  ////////////////////////////////////////////////////////////////////////////

  private authorize(user: UserEntity): UserEntity {
    user.authorize(this.cipher);
    return user;
  }
}
