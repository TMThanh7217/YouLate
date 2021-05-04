'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let path = require('path');
    let fs = require('fs');
    let user_subjectData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../public/json/user_subject.json')));
    for (let data of user_subjectData) {
      data.createdAt = Sequelize.literal('NOW()');
      data.updatedAt = Sequelize.literal('NOW()');
    }
    return queryInterface.bulkInsert('User_Subjects', user_subjectData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User_Subjects', null, {});
  }
};
