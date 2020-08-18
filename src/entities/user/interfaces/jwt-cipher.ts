export interface IJwtCipher {
  tokenize: (data: object) => string;
}
