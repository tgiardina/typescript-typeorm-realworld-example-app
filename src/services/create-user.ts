import { getConnection } from'typeorm';

import { User }   from '../models';
import { Result } from '../helpers';

export async function createUser(username: string): Promise<Result<User>> {
  try {
    const user     = new User();
    user.username  = username;
    return Result.ok(await getConnection().manager.save(user));
  } catch(err) {
    return Result.fail(err.code);
  }
}
