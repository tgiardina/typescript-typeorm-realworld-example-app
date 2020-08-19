import { Application } from 'express';

import { SerializeMiddleware } from '../controllers';

export function loadSerializeMiddleware(
  app: Application,
  middleware: SerializeMiddleware,
): void {
  app.use(middleware.setup.bind(middleware));
}
