"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("events", "street", Sequelize.STRING);
    await queryInterface.addColumn("events", "cep", Sequelize.STRING);
    await queryInterface.addColumn("events", "complement", Sequelize.STRING);
    await queryInterface.addColumn("events", "number", Sequelize.STRING);
    await queryInterface.addColumn("events", "city", Sequelize.STRING);
    await queryInterface.addColumn("events", "state", Sequelize.STRING);
    await queryInterface.removeColumn("events", "address");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("events", "address", Sequelize.STRING);
    await queryInterface.removeColumn("events", "street");
    await queryInterface.removeColumn("events", "cep");
    await queryInterface.removeColumn("events", "complement");
    await queryInterface.removeColumn("events", "number");
    await queryInterface.removeColumn("events", "city");
    await queryInterface.removeColumn("events", "state");
  },
};
