'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('post_comments', {
      type: 'foreign key', 
      name: 'post_comments_fk',
      fields: ['ref_post_id'],
      references:{
        table: 'posts',
        field: 'id'
      }
    
    }
    )},

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('post_comments', 'post_comments_fk');
  },
};