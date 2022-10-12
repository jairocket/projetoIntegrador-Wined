"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn(
      "users",
      "profile_picture_id",
      "avatar_picture"
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn(
      "users",
      "avatar_picture",
      "profile_picture_id"
    );
  },
};
