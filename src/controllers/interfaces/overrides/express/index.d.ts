declare namespace Express {
  interface Request {
    locals?: {
      user?: {
        id: number;
        email: string;
        password: string;
      };
    };
  }
}
