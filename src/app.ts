////////////////////////////////////////////////////////////////////////////////
// Import
////////////////////////////////////////////////////////////////////////////////

// Packages
import bodyParser = require('body-parser');
import express   = require('express');

// Local
import controllers = require('./controllers');
import loaders     = require('./loaders');
import models      = require('./models');

////////////////////////////////////////////////////////////////////////////////
// Module
////////////////////////////////////////////////////////////////////////////////

(async () => {
  const app: express.Application = express();
  app.use(bodyParser.json());
  const load = loaders.init();
  const db = models.init(load.sequelize);
  controllers.init(app, db);
  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });  
})()
