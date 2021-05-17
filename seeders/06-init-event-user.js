'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let path = require('path');
    let fs = require('fs');
    let event_userData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../public/json/event_user.json')));
    for (let data of event_userData) {
      data.createdAt = Sequelize.literal('NOW()');
      data.updatedAt = Sequelize.literal('NOW()');
    }
    return queryInterface.bulkInsert('Event_Users', event_userData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Event_Users', null, {});
  }
};
