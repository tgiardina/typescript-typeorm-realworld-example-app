import 'dotenv';
import 'reflect-metadata';
import { Application } from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';

import { TYPES } from './constants';
import { SerializeMiddleware } from './controllers';
import {
  loadContainer,
  loadDatabase,
  loadParser,
  loadSerializeMiddleware,
} from './loaders';

export default async function init(): Promise<Application> {
  await loadDatabase();
  const container = loadContainer();
  const server = new InversifyExpressServer(container);
  server.setConfig((app) => {
    loadParser(app);
    loadSerializeMiddleware(
      app,
      container.get<SerializeMiddleware>(TYPES.SerializeMiddleware),
    );
  });
  const app = server.build();
  return app;
}
