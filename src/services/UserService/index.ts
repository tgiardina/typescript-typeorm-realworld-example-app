import { inject, injectable } from 'inversify';
import 'reflect-metadata';

import { Result } from '../../helpers';
import { IUser, IUserRepository } from '../../interfaces';
import { TYPES } from '../../constants';

@injectable()
export class UserService {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: IUserRepository
  ) { }

  async create(data: IUser): Promise<Result<IUser>> {
    try {
      const user = this.userRepository.create(data);
      await this.userRepository.save(user)
      return Result.ok(user);
    } catch (err) {
      return Result.fail(err.code);
    }
  }
}
