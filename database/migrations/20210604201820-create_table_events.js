'use strict';

const Brotherhood = require("../models/Brotherhood");

module.exports = {
  up: async (queryInterface, Sequelize) => {
 
     await queryInterface.createTable('events', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      address:{
          type: Sequelize.STRING(255),
          allowNull:false
      },
      brotherhood_id:{
          type: Sequelize.INTEGER(11),
          references: {
            model: "brotherhoods",
            allowNull: false,
            key: "id"
          }
      }
      });
     
  },

  down: async (queryInterface, Sequelize) => {

     await queryInterface.dropTable('events');
  }
};
