import { Application } from 'express';

import { AuthMiddleware } from '../controllers';

export function loadAuthMiddleware(
  app: Application,
  middleware: AuthMiddleware,
): void {
  app.use(middleware.parse.bind(middleware));
}
