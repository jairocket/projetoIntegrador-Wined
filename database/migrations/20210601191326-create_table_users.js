'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id:{
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      name: {
          type: Sequelize.STRING(15),
          allowNull: false
      },
      surname: {
          type: Sequelize.STRING(25),
          allowNull: false
      },
      email: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true
      },
      terms: {
          type: Sequelize.STRING(10),
          allowNull:false
      },
      password: {
          type: Sequelize.STRING(255),
          allowNull: false
      },
      profile_picture_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "profile_pictures",
            key: "id"
          }
      },  
      background_picture_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "background_pictures",
            key: "id"
          }
      },
      description: {
          type: Sequelize.STRING(1024),
      },
      birthday: {
          type: Sequelize.DATE,
          allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};