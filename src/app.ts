import 'reflect-metadata';
import { Application } from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';

import { TYPES } from './constants';
import { IAuthMiddleware } from './controllers';
import {
  loadAuthMiddleware,
  loadContainer,
  loadMiddleware,
  loadPreContainer
} from './loaders';

export default async function init(): Promise<Application> {
  await loadPreContainer();
  const container = loadContainer();
  const app = new InversifyExpressServer(container);
  app.setConfig((app) => {
    loadMiddleware(app);
    loadAuthMiddleware(
      app,
      container.get<IAuthMiddleware>(TYPES.AuthMiddleware),
    );
  });
  return app.build();
}
