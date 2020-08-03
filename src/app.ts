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

(async () => {
  if (process.env.NODE_ENV !== "test") {
    const app = await init();
    app.listen(process.env.PORT, function() {
      console.log(`Example app listening on port ${process.env.PORT}!`);
    });
  }
})()
