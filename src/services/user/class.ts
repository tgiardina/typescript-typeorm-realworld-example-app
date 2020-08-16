import { inject, injectable } from 'inversify';

import { TYPES } from '../../constants';
import { Result } from '../../helpers';
import { IJwtCipher, IUserRepository, IUserTokenizable } from './interfaces';

@injectable()
export class UserService<T> {
  constructor(
    @inject(TYPES.UserRepository) private userRepository:
      IUserRepository<T>,
    @inject(TYPES.JwtCipher) private cipher: IJwtCipher,
  ) { }

  public async create(data: T): Promise<Result<IUserTokenizable>> {
    try {
      const user = this.userRepository.create(data);
      await this.userRepository.save(user);
      this.authenticate(user);
      return Result.ok(user);
    } catch (err) {
      return Result.fail(err.code);
    }
  }

  public async findById(id: number): Promise<Result<IUserTokenizable>> {
    const user = await this.userRepository.findOne(id);
    if (user) {
      this.authenticate(user);
      return Result.ok(user);
    } else {
      return Result.fail("ER_NOT_FOUND");
    }
  }

  private authenticate(user: IUserTokenizable): void {
    user.token = this.cipher.tokenize({
      id: user.id,
      username: user.username,
    });
  }
}
