'use strict';
var bcrypt = require('bcrypt');
const saltRound = 10;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let path = require('path');
    let fs = require('fs');
    let accountData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../public/json/account.json')));
    for (let data of accountData) {
      data.username = data.username.toLowerCase();
      let salt = bcrypt.genSaltSync(saltRound);
      let hash = bcrypt.hashSync(data.password, salt);
      data.password = hash;
      console.log(data.username);
      console.log(data.password);
      data.createdAt = Sequelize.literal('NOW()');
      data.updatedAt = Sequelize.literal('NOW()');
    }
    return queryInterface.bulkInsert('Accounts', accountData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Accounts', null, {});
  }
};
