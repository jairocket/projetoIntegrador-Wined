"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("users", "background_picture", {
      type: Sequelize.STRING(255),
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("users", "background_picture", {
      type: Sequelize.INTEGER,
    });
  },
};
