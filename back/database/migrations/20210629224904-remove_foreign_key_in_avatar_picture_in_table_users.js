"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("users", "users_ibfk_1");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("users", {
      type: "foreign key",
      fields: ["avatar_picture"],
    });
  },
};
