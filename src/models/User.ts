////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////

const Sequelize = require('sequelize');

////////////////////////////////////////////////////////////////////////////////
// Module
////////////////////////////////////////////////////////////////////////////////

class User extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        joined: {
          allowNull    : false,              
          defaultValue : DataTypes.NOW,
          type         : DataTypes.DATE,              
        },
        last_login: {
          allowNull    : false,              
          defaultValue : DataTypes.NOW,
          type         : DataTypes.DATE,              
        },
        username: {
          allowNull : false,              
          type      : DataTypes.STRING,
          unique    : true,
        },                    
      },
      { sequelize },
    );
  }
}

module.exports = User;
