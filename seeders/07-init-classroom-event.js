'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let path = require('path');
    let fs = require('fs');
    let classroom_eventData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../public/json/classroom_event.json')));
    for (let data of classroom_eventData) {
      data.createdAt = Sequelize.literal('NOW()');
      data.updatedAt = Sequelize.literal('NOW()');
    }
    return queryInterface.bulkInsert('Classroom_Events', classroom_eventData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Classroom_Events', null, {});
  }
};
