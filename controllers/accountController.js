var controller = {};
var bcrypt = require('bcrypt');
const saltRound = 10;
var models = require('../models');
var Account = models.Account;
const { QueryTypes } = require('sequelize');
var userController = require('./userController');

controller.getAll = async (query) => {
    let option = {
        sql: 'SELECT * FROM "Accounts"',
        plain: false, // return all records if false, else return the 1st record
        raw: true,
        type: QueryTypes.SELECT
    }

    return await models.sequelize.query(option.sql, {
        plain: option.plain,
        raw: option.raw,
        type: option.type
    });
};

controller.findById = async (id) => {
    let option = {
        sql: 'SELECT * FROM "Accounts" WHERE "id" = :id',
        plain: true, // return all records if false, else return the 1st record
        raw: true,
        type: QueryTypes.SELECT
    }

    return await models.sequelize.query(option.sql, {
        plain: option.plain,
        raw: option.raw,
        replacements: { id: id },
        type: option.type
    });
};

controller.findByUsername = username => {
    let option = {
        sql: 'SELECT * FROM "Accounts" WHERE "username" = :username',
        plain: true, // return all records if false, else return the 1st record
        raw: true,
        type: QueryTypes.SELECT
    }

    return models.sequelize.query(option.sql, {
        plain: option.plain,
        raw: option.raw,
        replacements: { username: username.toLowerCase() },
        type: option.type
    });
}

controller.createAccount = account => {
    bcrypt.genSalt(saltRound, (err, salt) => {
		bcrypt.hash(account.password, salt, async function(err, hash) {
			account.username = account.username.toLowerCase();
			account.password = hash;
			return await Account.create(account);
		})
	})
}

controller.comparePassword = (pwd, accountPwd) => {
    return bcrypt.compareSync(pwd, accountPwd)
}

controller.findOwnUserByUserId = userId => {
    return userController.findById(userId);
};

module.exports = controller;