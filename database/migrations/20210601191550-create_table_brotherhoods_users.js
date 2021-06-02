'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('brotherhoods_users', {
      id:{
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      users_id: {
          type: Sequelize.INTEGER(10),
          references: {
            model: "users",
            allowNull: false,
            key: "id"
          }
      },   
      brotherhood_id: {
          type: Sequelize.INTEGER(11),
          references: {
            model: "brotherhoods",
            allowNull: false,
            key: "id"
          }
      },
      chancellor: {
          type: Sequelize.BOOLEAN,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('brotherhoods_users');
  }
};