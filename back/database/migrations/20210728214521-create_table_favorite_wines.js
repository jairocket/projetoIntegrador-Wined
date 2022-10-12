"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("favorite_wines", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      users_id: {
        type: Sequelize.INTEGER(10),
        references: {
          model: "users",
          allowNull: false,
          key: "id",
        },
      },
      wine_id: {
        type: Sequelize.INTEGER(10),
        references: {
          model: "wines",
          allowNull: false,
          key: "id",
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("favorite_wines");
  },
};
