'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('wines', { 
      id: Sequelize.INTEGER,
      wine: {
        type: Sequelize.STRING(255),
      },
      wine_slug: {
        type: Sequelize.STRING(255),
      },
      appelation:{
        type: Sequelize.STRING(255),
      },
      appelation_slug: {
        type: Sequelize.STRING(255),
      },
      color: {
        type: Sequelize.STRING(255),
      },
      wine_type: {
        type: Sequelize.STRING(255),
      },
      regions: {
        type: Sequelize.STRING(255),
      },
      country: {
        type: Sequelize.STRING(255),
      },
      vintage: {
        type: Sequelize.STRING(255),
      },
      score: {
        type: Sequelize.INTEGER,
      },
      confidence_index: {
        type: Sequelize.STRING(255),
      },
      picture_path: {
        type: Sequelize.STRING(255),
      }
    });
     
  },

  down: async (queryInterface, Sequelize) => {

     await queryInterface.dropTable('wines');
     
  }
};
