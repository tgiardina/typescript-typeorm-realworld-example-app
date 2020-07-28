import * as express from 'express';

import initLoaders     from './loaders';
import initControllers from './controllers';

(async () => {
  const app: express.Application = express();
  await initLoaders(app);
  initControllers(app);
  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });  
})()
