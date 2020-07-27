const sequelizeLoader = require('./sequelize');

export function init() {
  return {
    sequelize : sequelizeLoader.init(),
  };
}
