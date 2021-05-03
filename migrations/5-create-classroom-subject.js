'use strict';

const classroom = require("../models/classroom");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Classroom_Subjects', {
      classroomId: {
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
    await queryInterface.dropTable('Classroom_Subjects');
  }
};