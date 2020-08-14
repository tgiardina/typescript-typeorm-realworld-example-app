import { inject, injectable } from 'inversify';

import { TYPES } from '../../constants';
import { Result } from '../../helpers';
import { IUserDto } from '../../models';
import { IUserRepository } from './interfaces';

@injectable()
export class UserService {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: IUserRepository,
  ) { }

  async create(data: IUserDto): Promise<Result<IUserDto>> {
    try {
      const user = this.userRepository.create(data);
      await this.userRepository.save(user)
      return Result.ok(user.toDto());
    } catch (err) {
      return Result.fail(err.code);
    }
  }

  async findById(id: number): Promise<Result<IUserDto>> {
    const user = await this.userRepository.findOne(id);
    if (user) {
      return Result.ok(user.toDto());
    } else {
      return Result.fail("ER_NOT_FOUND");
    }
  }
}
