'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Users', 
      'DetailId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Details',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'DetailId', {})
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
