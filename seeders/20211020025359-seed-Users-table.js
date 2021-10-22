'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'edys.0021@gmail.com',
        password: 'edys0021',
        role: 'user',
        DetailId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'p.ind031@gmail.com',
        password: 'puspa31',
        role: 'user',
        DetailId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
