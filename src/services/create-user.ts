import { getConnection } from'typeorm';

import { User }   from '../models';
import { Result } from '../helpers';

export async function createUser(username: string): Promise<Result<User>> {
  try {
    const user     = new User();
    user.joined    = new Date();
    user.lastLogin = user.joined;
    user.username  = username;
    await getConnection().manager.save(user);
    return Result.ok(user);
  } catch(err) {
    return Result.fail(err.code);
  }
}
