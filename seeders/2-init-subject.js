'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let path = require('path');
    let fs = require('fs');
    let subjectData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../public/json/subject.json')));
    for (let data of subjectData) {
      data.createdAt = Sequelize.literal('NOW()');
      data.updatedAt = Sequelize.literal('NOW()');
    }
    return queryInterface.bulkInsert('Subjects', subjectData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Subjects', null, {});
  }
};
