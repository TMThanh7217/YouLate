var controller = {};
var models = require('../models');
var Attendance = models.Attendance;
const { QueryTypes } = require('sequelize');

controller.getAll = async (query) => {
    let option = {
        sql: 'SELECT * FROM "Attendances"',
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
        sql: 'SELECT * FROM "Attendances" WHERE "id" = :id',
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

controller.createAttendance = async (attendance) => {
    return await Attendance.create(attendance);
}

// update all attribute except primary key and foreign key
controller.updateAllAttributeAttendance = async (attendance) => {
    let option = {
        sql: `Update "Attendances" 
                SET "date" = :date
                WHERE "id" = :id`,
        type: QueryTypes.UPDATE
    }

    return await models.sequelize.query(option.sql, {
        replacements: {
            id: attendance.id,
            date: attendance.date
        },
        type: option.type
    });
}

controller.updateOneAttributeAttendance = async (id, attribute, value) => {
    let option = {
        sql: `Update "Attendances" 
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