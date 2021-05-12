var controller = {};
var bcrypt = require('bcrypt');
const saltRound = 10;
var models = require('../models');
var Account = models.Account;
const { QueryTypes } = require('sequelize');

controller.getAll = async (query) => {
    let option = {
        sql: 'SELECT * FROM  "Accounts"',
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
        sql: 'SELECT * FROM  "Accounts" where id = :id',
        plain: false, // return all records if false, else return the 1st record
        raw: true,
        type: QueryTypes.SELECT
    }

    return await models.sequelize.query(option.sql, {
        plain: option.plain,
        raw: option.raw,
        replacement: { id: id },
        type: option.type
    });
};

controller.findByUsername = async userName => {
    let option = {
        sql: 'SELECT * FROM  "Accounts" where username = :username',
        plain: false, // return all records if false, else return the 1st record
        raw: true,
        type: QueryTypes.SELECT
    }

    return await models.sequelize.query(option.sql, {
        plain: option.plain,
        raw: option.raw,
        replacement: { username: username },
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

controller.compareAccount = account => {
    let instance = controller.findByUsername(account.username)
    if(instance) {
        bcrypt.compare(account.password, hash, function(err, result) {
            // result == true
            return true
        });
        return false
    }
}

module.exports = controller;