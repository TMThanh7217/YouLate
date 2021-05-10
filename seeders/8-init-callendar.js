'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let path = require('path');
    let fs = require('fs');
    let callendarData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../public/json/callendar.json')));
    for (let data of callendarData) {
      data.createdAt = Sequelize.literal('NOW()');
      data.updatedAt = Sequelize.literal('NOW()');
    }
    return queryInterface.bulkInsert('Callendars', callendarData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Callendars', null, {});
  }
};
