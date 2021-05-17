'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Event_Users', {
      eventId: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      type: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Event_Users');
  }
};