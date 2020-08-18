import { Application } from 'express';

import { DeserializeMiddleware } from '../controllers';

export function loadSerializeMiddleware(
  app: Application,
  middleware: DeserializeMiddleware,
): void {
  app.use(middleware.parse.bind(middleware));
}
