'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('post_comments', 'ref_post_id', Sequelize.INTEGER, {
      references:{
        model: 'posts',
        allowNull: false,
        key: 'id'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('post_comments', 'ref_post_id')

  }
};
