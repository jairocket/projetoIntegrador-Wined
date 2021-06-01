'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('brotherhoods', {
      id:{
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      name: {
          type: Sequelize.STRING(50),
          allowNull: false
      },
      brotherhood_picture_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "brotherhood_pictures",
            key: "id"
          }
      },
      description: {
          type: Sequelize.STRING(255),
      },
      since: {
          type: Sequelize.DATE,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('brotherhoods');
  }
};