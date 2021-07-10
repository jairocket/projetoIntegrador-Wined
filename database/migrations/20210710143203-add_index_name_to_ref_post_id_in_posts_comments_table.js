'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    queryInterface.addIndex('post_comments', ['ref_post_id'], {
      name: 'reference_post_id_fk'
     });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeIndex('post_comments', 'reference_post_id_fk')

  }
};
