'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>{queryInterface.addConstraint('wines', ['id'], {
    type: 'primary key',
    name: 'wines_pkey'
  });
},

  down: async (queryInterface, Sequelize) => {
    down:  queryInterface.removeConstraint('wines', 'wines_pkey')
  }
};
