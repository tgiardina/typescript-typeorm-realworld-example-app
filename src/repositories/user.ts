import { inject, injectable } from 'inversify';
import { getRepository, Repository } from "typeorm";
import { UserEntity } from "../entities";

import { TYPES } from '../constants';
import { IUserResponseDto } from '../controllers';
import { IJwtCipher } from '../entities';

@injectable()
export class UserRepository {
  private repository: Repository<UserEntity>;

  constructor(@inject(TYPES.JwtCipher) private cipher: IJwtCipher) {
    this.repository = getRepository(UserEntity);
  }

  create(data: UserEntity): UserEntity {
    return this.wrapEntity(this.repository.create(data));
  }

  async createAndSaveDto(data: UserEntity): Promise<IUserResponseDto> {
    const user = this.wrapEntity(this.repository.create(data));
    await this.repository.save(user);
    return user.toDto();
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.repository.findOne(id);
    return user && this.wrapEntity(user);
  }

  async findOneDto(id: number): Promise<IUserResponseDto> {
    const user = await this.repository.findOne(id);
    return user && this.wrapEntity(user).toDto();
  }

  async save(user: UserEntity): Promise<UserEntity> {
    return this.wrapEntity(await this.repository.save(user));
  }

  private wrapEntity(user: UserEntity): UserEntity {
    return new UserEntity(user, this.cipher);
  }
}
