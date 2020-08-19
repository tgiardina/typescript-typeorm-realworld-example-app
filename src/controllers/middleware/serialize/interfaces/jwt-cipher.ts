export interface IJwtCipher {
  serialize: (dto: unknown) => string;
}
