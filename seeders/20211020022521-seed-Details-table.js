'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Details', [
      {
        fullName: 'Edy Sutrisno',
        birthDate: '09-21-1995',
        gender: 'Male',
        profilePitc: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'Puspa Indah',
        birthDate: '10-31-1998',
        gender: 'Female',
        profilePitc: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return  queryInterface.bulkDelete('Details', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
