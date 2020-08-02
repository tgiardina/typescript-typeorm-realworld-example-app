import { Result } from '../../helpers';
import { IUserData, IUserModel, IUserRepository } from '../../interfaces';

export class UserService {
  constructor(private userRepository: IUserRepository) { }

  async create(data: IUserData): Promise<Result<IUserModel>> {
    try {
      const user = this.userRepository.create(data);
      await this.userRepository.save(user);
      return Result.ok(user);
    } catch (err) {
      return Result.fail(err.code);
    }
  }
}
