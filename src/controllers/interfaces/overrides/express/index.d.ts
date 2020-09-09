declare namespace Express {
  interface Request {
    locals?: {
      user?: {
        id: number;
      };
    };
  }
}
