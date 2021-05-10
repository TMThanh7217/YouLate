'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let path = require('path');
    let fs = require('fs');
    let eventData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../public/json/event.json')));
    for (let data of eventData) {
      data.createdAt = Sequelize.literal('NOW()');
      data.updatedAt = Sequelize.literal('NOW()');
    }
    return queryInterface.bulkInsert('Events', eventData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Events', null, {});
  }
};
