declare namespace Express {
  interface Request<A = any, L = any, C = any, D = any> {
    locals?: L;
  }
}
