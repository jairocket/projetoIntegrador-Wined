"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn(
      "users",
      "background_picture_id",
      "background_picture"
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn(
      "users",
      "background_picture",
      "background_picture_id"
    );
  },
};
