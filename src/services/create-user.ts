import { getConnection } from'typeorm';

import { User } from '../models';

export async function createUser(username: string): Promise<User> {
  try {
    const user     = new User();
    user.joined    = new Date();
    user.lastLogin = user.joined;
    user.username  = username;
    await getConnection().manager.save(user);
    return user;
  } catch(err) {
    console.error(err);
  }
}
