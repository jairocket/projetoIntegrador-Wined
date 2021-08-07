'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users_events', {
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
      users_id: {
        type: Sequelize.INTEGER(10),
        references: {
          model: "users",
          allowNull: false,
          key: "id"
        }
    },
      events_id: {
        type: Sequelize.INTEGER(11),
        references: {
          model: "events",
          allowNull: false,
          key: "id"
        }
      }
    })
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.dropTable('users_events');

  }
};
