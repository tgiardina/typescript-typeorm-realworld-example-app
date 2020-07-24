////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////

// Packages
import fs   = require('fs');

////////////////////////////////////////////////////////////////////////////////
// Module
////////////////////////////////////////////////////////////////////////////////

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
// }

////////////////////////////////////////////////////////////////////////////////
// Export
////////////////////////////////////////////////////////////////////////////////

export function init(sequelize) {
  const models = getModels(sequelize);
  // associateModels(models);
  return models;
}
