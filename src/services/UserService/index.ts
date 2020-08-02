import { Result } from '../../helpers';
import { UserModel } from '../../models';

export class UserService {
  constructor(private Model: typeof UserModel) { }

  async create(username: string) {
    try {
      const user = this.Model.create({ username });
      await user.save();
      return Result.ok(user);
    } catch (err) {
      return Result.fail(err.code);
    }
  }
}
