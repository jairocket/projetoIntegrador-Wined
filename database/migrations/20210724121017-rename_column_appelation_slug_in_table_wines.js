'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.renameColumn('wines', 'appelation_slug', 'appellation_slug');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('wines', 'appellation_slug', 'appelation_slug');
  }
};
