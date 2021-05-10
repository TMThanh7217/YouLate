'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let path = require('path');
    let fs = require('fs');
    let lecturerData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../public/json/lecturer.json')));
    for (let data of lecturerData) {
      data.createdAt = Sequelize.literal('NOW()');
      data.updatedAt = Sequelize.literal('NOW()');
    }
    return queryInterface.bulkInsert('Lecturers', lecturerData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Lecturers', null, {});
  }
};
