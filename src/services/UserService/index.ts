import { Result } from '../../helpers';
import { IUserData, IUserModel, IUserModelStatic } from '../../interfaces';

export class UserService {
  constructor(private UserModelStatic: IUserModelStatic) { }

  async create(data: IUserData): Promise<Result<IUserModel>> {
    try {
      const user = this.UserModelStatic.create(data);
      await user.save();
      return Result.ok(user);
    } catch (err) {
      return Result.fail(err.code);
    }
  }
}
