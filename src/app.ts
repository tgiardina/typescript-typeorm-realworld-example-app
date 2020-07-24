////////////////////////////////////////////////////////////////////////////////
// Import
////////////////////////////////////////////////////////////////////////////////

// Packages
const bodyParser = require('body-parser');
import express   = require('express');

// Local
const controllers = require('./controllers');
const loaders     = require('./loaders');
const models      = require('./models');

////////////////////////////////////////////////////////////////////////////////
// Module
////////////////////////////////////////////////////////////////////////////////

(async () => {
  const app: express.Application = express();
  app.use(bodyParser.json());
  const load = loaders();
  const db = models(load.sequelize);
  controllers(app, db)
  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });  
})()
