'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'provider', Sequelize.BOOLEAN, {
      DEFAULT: false,
      after: 'birthday'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'provider')

  }
};
