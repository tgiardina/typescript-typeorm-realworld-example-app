import 'reflect-metadata';
import { Application } from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';

import { loadConfig, loadContainer, loadMiddleware } from './loaders';

export default async function init(): Promise<Application> {
  await loadConfig();
  const container = loadContainer();
  const app = new InversifyExpressServer(container);
  app.setConfig(loadMiddleware);
  return app.build();
}

(async () => {
  if (process.env.NODE_ENV !== "test") {
    const app = await init();
    app.listen(process.env.PORT, function() {
      console.log(`Example app listening on port ${process.env.PORT}!`);
    });
  }
})()
