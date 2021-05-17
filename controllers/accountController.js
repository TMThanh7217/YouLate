var controller = {};
var bcrypt = require('bcrypt');
const saltRounds = 10;
var models = require('../models');
var Account = models.Account;
const { QueryTypes } = require('sequelize');

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

controller.findById = (id) => {
    let option = {
        sql: 'SELECT * FROM "Accounts" WHERE "id" = :id',
        plain: true, // return all records if false, else return the 1st record
        raw: true,
        type: QueryTypes.SELECT
    }

    return models.sequelize.query(option.sql, {
        plain: option.plain,
        raw: option.raw,
        replacements: { id: id },
        type: option.type
    });
};

controller.findAttributeById = (id, attribute) => {
    let option = {
        sql: `SELECT ${attribute} FROM "Accounts" WHERE "id" = :id`,
        plain: true, // return all records if false, else return the 1st record
        raw: true,
        type: QueryTypes.SELECT
    }

    return models.sequelize.query(option.sql, {
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
    let salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(account.password, salt);
    account.password = hash
    return Account.create(account)
}

controller.comparePassword = (pwd, accountPwd) => {
    return bcrypt.compareSync(pwd, accountPwd)
}

// update all attribute except primary key and foreign key
controller.updateAllAttributeAccount = async (account) => {
    let option = {
        sql: `Update "Accounts" 
                SET username = :username, password = :password, type = :type
                WHERE "id" = :id`,
        type: QueryTypes.UPDATE
    }

    return await models.sequelize.query(option.sql, {
        replacements: {
            id: account.id,
            username: account.username,
            password: account.password,
            type: account.type
        },
        type: option.type
    });
}

controller.updateOneAttributeAccount = async (id, attribute, value) => {
    let option = {
        sql: `Update "Accounts" 
                SET "${attribute}" = :value
                WHERE "id" = ${id}`,
        type: QueryTypes.UPDATE
    }

    return await models.sequelize.query(option.sql, {
        replacements: { value: value },
        type: option.type
    });
}

module.exports = controller;