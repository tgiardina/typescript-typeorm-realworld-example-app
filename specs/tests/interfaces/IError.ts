export interface IError {
  errors: {
    body: string[],
    headers: string[],
    server: string[],
  }
}
