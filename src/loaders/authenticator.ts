import { Application } from 'express';

import { IAuthMiddleware } from '../controllers';

export function loadAuthMiddleware(
  app: Application,
  middleware: IAuthMiddleware,
): void {
  app.use(middleware.parse.bind(middleware));
}
