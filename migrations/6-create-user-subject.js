'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User_subjects', {
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      subjectId: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('User_subjects');
  }
};