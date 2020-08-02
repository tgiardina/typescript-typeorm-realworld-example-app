import * as express from 'express';

import { load, loadContainer } from './loaders';
import initControllers from './controllers';

export default async function init(): Promise<express.Application> {
  const app: express.Application = express();
  await load(app);
  const container = loadContainer();
  initControllers(app, container);
  return app;
}

(async () => {
  if (process.env.NODE_ENV !== "test") {
    const app = await init();
    app.listen(process.env.PORT, function() {
      console.log(`Example app listening on port ${process.env.PORT}!`);
    });
  }
})()
