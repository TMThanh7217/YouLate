var controller = {};
var models = require('../models');
var Grade = models.Grade;
const { QueryTypes } = require('sequelize');

controller.getAll = async (query) => {
    let option = {
        sql: 'SELECT * FROM "Grades"',
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
        sql: 'SELECT * FROM "Grades" WHERE id = :id',
        plain: true, // return all records if false, else return the 1st record
        raw: true,
        type: QueryTypes.SELECT
    }

    return await models.sequelize.query(option.sql, {
        plain: option.plain,
        raw: option.raw,
        replacements: {id: id},
        type: option.type
    });
};

controller.createGrade = async (grade) => {
    return await Grade.create(evegradent);
}

// update all attribute except primary key and foreign key
controller.updateAllAttributeGrade = async (grade) => {
    let option = {
        sql: `Update "Grades" 
                SET "total" = :total
                WHERE "id" = :id`,
        type: QueryTypes.UPDATE
    }

    return await models.sequelize.query(option.sql, {
        replacements: {
            id: grade.id,
            total: grade.total
        },
        type: option.type
    });
}

controller.updateOneAttributeGrade = async (id, attribute, value) => {
    let option = {
        sql: `Update "Grades" 
                SET "${attribute}" = :value
                WHERE "id" = ${id}`,
        type: QueryTypes.UPDATE
    }

    return await models.sequelize.query(option.sql, {
        replacements: { value: value},
        type: option.type
    });
}

module.exports = controller;