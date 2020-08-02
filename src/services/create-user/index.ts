import { getConnection } from 'typeorm';

import { UserModel } from '../../models';
import { Result } from '../../helpers';

export async function createUser(username: string): Promise<Result<UserModel>> {
  try {
    const user = new UserModel();
    user.username = username;
    await getConnection().manager.save(user)
    return Result.ok(user);
  } catch (err) {
    return Result.fail(err.code);
  }
}
