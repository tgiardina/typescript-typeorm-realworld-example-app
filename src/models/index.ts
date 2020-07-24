////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////

const Sequelize = require('sequelize'),
      sqlConfig = require('../../config/config.js')[process.env.NODE_ENV],
      Op        = Sequelize.Op,      
      database  = sqlConfig.database,
      user      = sqlConfig.username,
      password  = sqlConfig.password,
      host      = sqlConfig.host;

////////////////////////////////////////////////////////////////////////////////
// Module
////////////////////////////////////////////////////////////////////////////////

module.exports = new Sequelize(database, user, password, {
  host    : process.env.SQL_HOST,
  dialect : 'mysql',
  logging : false,
  pool: {
    max:     5,
    min:     0,
    acquire: 30000,
    idle:    10000,
  }
});
