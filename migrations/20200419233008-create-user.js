'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      joined: {
        allowNull: false,
        type: Sequelize.DATE
      },
      lastLogin: {
        allowNull: false,            
        type: Sequelize.DATE            
      }, 
      username: {
        allowNull: false,                        
        type: Sequelize.STRING,
        unique: true
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
