"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addConstraint("wines", {
      type: "primary key",
      name: "wines_pkey",
      fields: ["id"],
    });
  },

  down: async (queryInterface, Sequelize) => {
    down: queryInterface.removeConstraint("wines", "wines_pkey");
  },
};
