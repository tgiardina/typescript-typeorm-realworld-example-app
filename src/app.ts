import 'dotenv';
import 'reflect-metadata';
import { Application } from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';

import { handleError } from './controllers';
// Note: This ^^ also loads controllers via inversify-express-utils.
import {
  loadContainer,
  loadDatabase,
  loadParser,
} from './loaders';

export default async function init(): Promise<Application> {
  await loadDatabase();
  const container = loadContainer();
  const server = new InversifyExpressServer(container);
  server.setConfig((app) => {
    loadParser(app);
  });
  server.setErrorConfig((app) => {
    app.use(handleError);
  });
  const app = server.build();
  return app;
}
