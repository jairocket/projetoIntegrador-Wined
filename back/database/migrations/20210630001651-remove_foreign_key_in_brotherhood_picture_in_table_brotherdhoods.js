"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "brotherhoods",
      "brotherhoods_ibfk_1"
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("brotherhoods", {
      type: "foreign key",
      fields: ["brotherhood_picture"],
    });
  },
};
