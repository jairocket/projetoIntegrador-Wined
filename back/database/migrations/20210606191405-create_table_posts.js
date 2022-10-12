"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Posts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      brotherhood_id: {
        type: Sequelize.INTEGER(11),
        references: {
          model: "brotherhoods",
          allowNull: false,
          key: "id",
        },
      },
      users_id: {
        type: Sequelize.INTEGER(10),
        references: {
          model: "users",
          allowNull: false,
          key: "id",
        },
      },
      content: {
        type: Sequelize.STRING(5120),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Posts");
  },
};
