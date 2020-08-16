export interface IJwtCipher {
  tokenize: (data: { id: number, username: string }) => string;
}
