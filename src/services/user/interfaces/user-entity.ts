export interface IUserEntity<T> {
  toDto: () => T;
}
