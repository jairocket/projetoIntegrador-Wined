"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn(
      "brotherhoods",
      "brotherhood_picture_id",
      "brotherhood_picture"
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn(
      "brotherhoods",
      "brotherhood_picture",
      "brotherhood_picture_id"
    );
  },
};
