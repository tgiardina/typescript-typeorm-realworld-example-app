import * as express from 'express';

import initLoaders from './loaders';
import initControllers from './controllers';

export default async function init(): Promise<express.Application> {
  const app: express.Application = express();
  await initLoaders(app);
  initControllers(app);
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
