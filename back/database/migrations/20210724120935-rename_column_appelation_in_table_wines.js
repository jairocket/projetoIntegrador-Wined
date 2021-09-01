'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.renameColumn('wines', 'appelation', 'appellation');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('wines', 'appellation', 'appelation');
  }
};
