"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("posts", "comment", Sequelize.BOOLEAN, {
      DEFAULT: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("posts", "comment");
  },
};
