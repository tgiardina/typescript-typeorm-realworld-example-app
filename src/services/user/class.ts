import { inject, injectable } from 'inversify';

import { TYPES } from '../../constants';
import { Result } from '../../helpers';
import { IUserDto } from '../../models';
import { IUserRepository } from './interfaces';

@injectable()
export class UserService<T> {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: IUserRepository<T>,
  ) { }

  async create(data: T): Promise<Result<T>> {
    try {
      const user = this.userRepository.create(data);
      await this.userRepository.save(user)
      return Result.ok(user.toDto());
    } catch (err) {
      return Result.fail(err.code);
    }
  }

  async findById(id: number): Promise<Result<T>> {
    const user = await this.userRepository.findOne(id);
    if (user) {
      return Result.ok(user.toDto());
    } else {
      return Result.fail("ER_NOT_FOUND");
    }
  }
}
