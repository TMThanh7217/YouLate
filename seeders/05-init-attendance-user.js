'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let path = require('path');
    let fs = require('fs');
    let attendance_userData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../public/json/attendance_user.json')));
    for (let data of attendance_userData) {
      data.createdAt = Sequelize.literal('NOW()');
      data.updatedAt = Sequelize.literal('NOW()');
    }
    return queryInterface.bulkInsert('Attendance_Users', attendance_userData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Attendance_Users', null, {});
  }
};
