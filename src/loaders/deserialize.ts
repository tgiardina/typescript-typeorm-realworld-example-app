import { Application } from 'express';

import { DeserializeMiddleware } from '../controllers';

export function loadDeserializeMiddleware(
  app: Application,
  middleware: DeserializeMiddleware,
): void {
  app.use(middleware.setup.bind(middleware));
}
