'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.createTable('post_comments', { 

        id: {
         type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true
        },

        post_id:{
          type: Sequelize.INTEGER,
          references:{
            model: 'posts',
            allowNull: false,
            key: 'id'
          }  
        },

        response: Sequelize.BOOLEAN
      
      });
     
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.dropTable('post_comments');
     
  }
};
