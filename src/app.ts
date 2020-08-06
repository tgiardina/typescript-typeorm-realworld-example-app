import 'reflect-metadata';
import { Application } from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';

import { loadContainer, loadMiddleware, loadPreContainer } from './loaders';

export default async function init(): Promise<Application> {
  await loadPreContainer();
  const container = loadContainer();
  const app = new InversifyExpressServer(container);
  app.setConfig(loadMiddleware);
  return app.build();
}
