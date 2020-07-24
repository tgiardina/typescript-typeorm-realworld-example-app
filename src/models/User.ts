////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////

const Sequelize = require('sequelize');

////////////////////////////////////////////////////////////////////////////////
// Module
////////////////////////////////////////////////////////////////////////////////

class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        joined: {
          allowNull    : false,              
          defaultValue : Sequelize.NOW,
          type         : Sequelize.DATE,              
        },
        lastLogin: {
          allowNull    : false,              
          defaultValue : Sequelize.NOW,
          type         : Sequelize.DATE,              
        },
        username: {
          allowNull : false,              
          type      : Sequelize.STRING,
          unique    : true,
        },                    
      },
      { sequelize },
    );
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////

module.exports = User;
