var controller = {};
var models = require('../models');
var Event = models.Event;
const { QueryTypes } = require('sequelize');

controller.getAll = async (query) => {
    let option = {
        sql: 'SELECT * FROM "Events"',
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
        sql: 'SELECT * FROM "Events" WHERE id = :id',
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

controller.createEvent = async (event) => {
    return await Event.create(event);
}

controller.updateAllAttributeEvent = async (event) => {
    let option = {
        sql: `Update "Events" 
                SET "date" = ${event.date}, "startTime" = ${event.startTime}, "endTime" = ${event.endTime}, "title" = ${event.title}
                WHERE "id" = :id`,
        type: QueryTypes.UPDATE
    }

    return await models.sequelize.query(option.sql, {
        replacements: {id: event.id},
        type: option.type
    });
}

controller.updateOneAttributeEvent = async (id, attribute, value) => {
    let option = {
        sql: `Update "Events" 
                SET "${attribute}" = ${value}
                WHERE "id" = ${id}`,
        type: QueryTypes.UPDATE
    }

    return await models.sequelize.query(option.sql, {
        type: option.type
    });
}

controller.getByClassroomId = classId => {
    let sql = ''
    sql += 'SELECT "Events"."id", "Events"."title", "Events"."date", "Events"."startTime", "Events"."endTime"'
    sql += ' FROM "Events"'
    sql += ` WHERE "Events"."classroomId" = ${classId}`
    let option = {
        plain: false, // return all records if false, else return the 1st record
        raw: true,
        type: QueryTypes.SELECT
    }

    return models.sequelize.query(sql, option);
}

controller.getByUserId = userId => {
    let sql = ''
    sql += 'SELECT "Events"."id", "Events"."title", "Events"."date", "Events"."startTime", "Events"."endTime"'
    sql += ' FROM "Events" JOIN "Event_Users" ON ("Events"."id" = "Event_Users"."eventId") JOIN "Classrooms" ON ("Classrooms"."id"="Events"."classroomId")'
    sql += ` WHERE "Event_Users"."userId" = ${userId}`
    let option = {
        plain: false, // return all records if false, else return the 1st record
        raw: true,
        type: QueryTypes.SELECT
    }

    return models.sequelize.query(sql, option);
}

module.exports = controller;