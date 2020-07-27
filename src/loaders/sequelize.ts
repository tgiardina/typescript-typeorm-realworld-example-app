const Sequelize = require('sequelize');
import config   = require('../../config/config.js')
const dbConfig  = config[process.env.NODE_ENV],
      database  = dbConfig.database,
      user      = dbConfig.username,
      password  = dbConfig.password,
      host      = dbConfig.host;

export function init() {
  return new Sequelize(database, user, password, {
    host    : host,
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
