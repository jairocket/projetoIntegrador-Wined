'use strict';



module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      name: 'Administrador',
      surname: 'Perfil Master',
      email: 'adm@wined.com',
      terms: "on",
      password: "01234567",
      birthday: "2000-01-01",
      provider: true,
      createdAt: "2021-06-06",
      updatedAt: "2021-06-06"
    }])
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('User', null, {});
     
  }
};
