'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let path = require('path');
    let fs = require('fs');
    let attendanceData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../public/json/attendance.json')));
    for (let data of attendanceData) {
      data.createdAt = Sequelize.literal('NOW()');
      data.updatedAt = Sequelize.literal('NOW()');
    }
    return queryInterface.bulkInsert('Attendances', attendanceData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Attendances', null, {});
  }
};
