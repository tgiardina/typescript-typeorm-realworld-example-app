export interface IJwtCipher {
  tokenize: (data: { [key: string]: string | number }) => string;
}
