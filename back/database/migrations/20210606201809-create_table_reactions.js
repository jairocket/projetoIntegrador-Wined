'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.createTable('reactions', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        users_id: {
          type: Sequelize.INTEGER,
          references:{
            model: 'users',
            allowNull: false,
            key: 'id'
          }
        },
        post_id: {
          type: Sequelize.INTEGER,
          references:{
            model: 'posts',
            allowNull: false,
            key: 'id'
          }
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
     
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('reactions');
     
  }
};
