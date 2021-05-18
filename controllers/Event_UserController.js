var controller = {};
var models = require('../models');
var Event_User = models.Event_User;
const { QueryTypes } = require('sequelize');

controller.getAll = async (query) => {
    let option = {
        sql: 'SELECT * FROM "Event_Users"',
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
        sql: 'SELECT * FROM "Event_Users" WHERE id = :id',
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
    return await Grade.create(grade);
}

controller.updateOneAttribute = async (id, attribute, value) => {
    let option = {
        sql: `Update "Event_Users" 
                SET "${attribute}" = :value
                WHERE "id" = ${id}`,
        type: QueryTypes.UPDATE
    }

    return await models.sequelize.query(option.sql, {
        replacements: { value: value},
        type: option.type
    });
}

controller.updateTypeByEventIdAndUserId = (eventId, userId, type) => {
    let sql = ''
    sql += ' UPDATE "Event_Users"'
    sql += ` SET "type" = :type`
    sql += ` WHERE "userId" = ${userId} AND "eventId" = ${eventId}`
    let option = {
        type: QueryTypes.UPDATE,
        replacements: {type: type}
    }

    return models.sequelize.query(sql, option)
}

controller.updateAttendanceTypesByListAttendancesAndEventId = (eventId, list) => {
    let listPromise = []
    for(let attendance of list)
        listPromise.push(controller.updateTypeByEventIdAndUserId(eventId, attendance.userId, attendance.attendanceType))
    return listPromise
}

module.exports = controller;