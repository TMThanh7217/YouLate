'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let path = require('path');
    let fs = require('fs');
    let classroom_userData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../public/json/classroom_user.json')));
    for (let data of classroom_userData) {
      data.createdAt = Sequelize.literal('NOW()');
      data.updatedAt = Sequelize.literal('NOW()');
    }
    return queryInterface.bulkInsert('Classroom_Users', classroom_userData, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Classroom_Users', null, {});
  }
};
