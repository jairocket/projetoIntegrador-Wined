"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("users", "users_ibfk_2");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("users", {
      type: "foreign key",
      fields: ["background_picture"],
    });
  },
};
