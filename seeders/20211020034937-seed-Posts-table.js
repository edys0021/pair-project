'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Posts', [
      {
        imgUrl: 'https://i.ibb.co/Bs5rXd2/file-20210708-25-fplaqf.jpg',
        caption: 'Main sama hewan kesayangan',
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        imgUrl: 'https://i.ibb.co/ncgwcm5/3479404469.jpg',
        caption: 'Saatnya menyiram tanaman',
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
