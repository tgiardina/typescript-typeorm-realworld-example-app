import fs        = require('fs');
import Sequelize = require('sequelize');

interface Models {
  [index: number]: Sequelize.Model;
}

/**
 * Imports all the models in this directory and then returns them as an object.
 */
function getModels(sequelize) {
  return fs.readdirSync(__dirname).reduce((models, file) => {
    const isModel = file.slice(-1)  != "~"
      && file.slice(-7)  != "test.js"
      && file.slice(0,5) != "index";
    if(isModel) models[file.slice(0,-3)] = require(`./${file}`).init(sequelize);
    return models;
  }, {});
}

// /**
//  * Associates all the models as appropriate.
//  */
// function associateModels(models) {
//   Object.values(models).forEach(model => {
//     model.associate(models);
//   });

export function init(sequelize): Models {
  const models = getModels(sequelize);
  // associateModels(models);
  return models;
}
