import { inject, injectable } from 'inversify';

import { IUserRepository } from '../../interfaces';
import { TYPES } from '../../constants';
import { Result } from '../../helpers';
import { IUserModel } from '../../models';

@injectable()
export class UserService {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: IUserRepository
  ) { }

  async create(data: IUserModel): Promise<Result<IUserModel>> {
    try {
      const user = this.userRepository.create(data);
      await this.userRepository.save(user)
      return Result.ok(user);
    } catch (err) {
      return Result.fail(err.code);
    }
  }
}
