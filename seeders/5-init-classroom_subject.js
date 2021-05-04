'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let path = require('path');
    let fs = require('fs');
    let classroom_subjectData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../public/json/classroom_subject.json')));
    for (let data of classroom_subjectData) {
      data.createdAt = Sequelize.literal('NOW()');
      data.updatedAt = Sequelize.literal('NOW()');
    }
    return queryInterface.bulkInsert('Classroom_Subjects', classroom_subjectData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Classroom_Subjects', null, {});
  }
};
