'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let path = require('path');
    let fs = require('fs');
    let gradeData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../public/json/grade.json')));
    for (let data of gradeData) {
      data.createdAt = Sequelize.literal('NOW()');
      data.updatedAt = Sequelize.literal('NOW()');
    }
    return queryInterface.bulkInsert('Grades', gradeData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Grades', null, {});
  }
};
