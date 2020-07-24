////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////

const Sequelize = require('sequelize');
const sqlConfig = require('../../config/config.js')[process.env.NODE_ENV];
const Op        = Sequelize.Op,      
      database  = sqlConfig.database,
      user      = sqlConfig.username,
      password  = sqlConfig.password,
      host      = sqlConfig.host;

////////////////////////////////////////////////////////////////////////////////
// Module
////////////////////////////////////////////////////////////////////////////////

export function init() {
  return new Sequelize("boilerplate", "boilerplate", "boilerplate", {
    host    : "db",
    dialect : 'mysql',
    logging : false,
    pool: {
      max:     5,
      min:     0,
      acquire: 30000,
      idle:    10000,
    }
  });
}
