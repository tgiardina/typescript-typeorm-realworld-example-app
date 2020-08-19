export interface IDto {
  [key: string]: unknown,
  user?: {
    [key: string]: unknown,
    token?: string,
  },
}
