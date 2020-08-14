import 'dotenv';
import 'reflect-metadata';
import { Application } from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';

import { TYPES } from './constants';
import { AuthMiddleware } from './controllers';
import {
  loadAuthMiddleware,
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
    loadAuthMiddleware(
      app,
      container.get<AuthMiddleware>(TYPES.AuthMiddleware),
    );
  });
  return server.build();
}
