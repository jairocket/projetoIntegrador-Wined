"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("posts_midia", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      post_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "posts",
          allowNull: false,
          key: "id",
        },
      },

      midia_type: Sequelize.STRING,

      midia_path: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("post_midia");
  },
};
