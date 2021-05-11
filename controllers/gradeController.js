var controller = {};
var models = require('../models');
var Grade = models.Grade;
const { QueryTypes } = require('sequelize');

controller.getAll = async (query) => {
    let option = {
        sql: 'SELECT * FROM  "Grades"',
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
        sql: 'SELECT * FROM  "Grades" where id = :id',
        plain: false, // return all records if false, else return the 1st record
        raw: true,
        replacement: {id: id},
        type: QueryTypes.SELECT
    }

    return await models.sequelize.query(option.sql, {
        plain: option.plain,
        raw: option.raw,
        replacement,
        type: option.type
    });
};

module.exports = controller;