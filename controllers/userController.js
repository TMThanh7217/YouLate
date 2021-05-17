var controller = {};
var models = require('../models');
var User = models.User;
var accountController = require('./accountController');
let authorizationAPI = require('../API/authorization-api')

const { QueryTypes } = require('sequelize');
const { Sequelize } = require('../models');

controller.getAll = async (query) => {
    let limit;
    let offset;
    if (query.limit > 0){
        limit = query.limit;
        offset = query.limit * (query.page - 1);
    }

    let option = {
        sql: `SELECT * FROM "Users" LIMIT ${limit} OFFSET ${offset}`,
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
        sql: 'SELECT * FROM "Users" WHERE "id" = :id',
        plain: true, // return all records if false, else return the 1st record
        raw: true,
        type: QueryTypes.SELECT
    }

    return models.sequelize.query(option.sql, {
        plain: option.plain,
        raw: option.raw,
        replacements: {id: id},
        type: option.type
    });
};

controller.createUser = user => {
    return User.create(user);
}

controller.findByAccountId = accountId => {
    let option = {
        sql: 'SELECT * FROM "Users" WHERE "accountId" = :accountId',
        plain: true, // return all records if false, else return the 1st record
        raw: true,
        type: QueryTypes.SELECT
    }

    return models.sequelize.query(option.sql, {
        plain: option.plain,
        raw: option.raw,
        replacements: {accountId: accountId},
        type: option.type
    });
};

controller.getUsersByUserTypesAndClassroomId = (userTypes, classroomId) => {
    let typesSQLConditions = '(' + userTypes.toString() + ')'
    console.log(typesSQLConditions)
    let sql = ''
    sql += 'SELECT "Users"."id", "Users"."name", "Users"."email", "Users"."SDT" '
    sql += 'FROM "Users" JOIN "Classroom_Users" ON ("Users"."id" = "Classroom_Users"."userId") JOIN "Accounts" ON("Accounts"."id" = "Users"."accountId") '
    sql += `WHERE "Classroom_Users"."classroomId" = ${classroomId} `
    sql +=  `AND "Accounts"."type" IN ${typesSQLConditions}`
    let option = {
        plain: false, // return all records if false, else return the 1st record
        raw: true,
        type: QueryTypes.SELECT
    }

    return models.sequelize.query(sql, {
        plain: option.plain,
        raw: option.raw,
        type: option.type
    });
}

controller.getLecturesByClassroomId = classroomId => {
    let userTypes = [authorizationAPI.LECTURE, authorizationAPI.SUB_LECTURE]
    return controller.getUsersByUserTypesAndClassroomId(userTypes, classroomId)
}

controller.getStudentsByClassroomId = classroomId => {
    let userTypes = [authorizationAPI.STUDENT]
    return controller.getUsersByUserTypesAndClassroomId(userTypes, classroomId)
}

controller.getUserWithAttendanceByEventId = eventId => {
    let sql = ''
    sql += ' SELECT "Users"."id", "Users"."name", "Users"."email", "Users"."SDT", "Users"."DoB", "Accounts"."type" AS accountType, "Event_Users"."type" AS "attendanceType"'
    sql += ' FROM "Users" JOIN "Event_Users" ON ("Users"."id" = "Event_Users"."userId") JOIN "Accounts" ON ("Accounts"."id" = "Users"."accountId")'
    sql += ` WHERE "Event_Users"."eventId" = ${eventId}`
    let option = {
        plain: false, // return all records if false, else return the 1st record
        raw: true,
        type: QueryTypes.SELECT
    }
    return models.sequelize.query(sql, option)
}

controller.findAllStudentBelongToLecturerId = lecturerId => {
    let userJoinCondition = '"Users"."id" = "Classroom_Users"."userId"';
    let classroomJoinCondition = '"Classrooms"."id" = "Classroom_Users"."classroomId"';
    let accountJoinCondition = '"Users"."accountId" = "Accounts"."id"';

    let option = {
        sql: `SELECT * FROM "Users" JOIN "Classroom_Users" ON ${userJoinCondition}
        JOIN "Classrooms" ON ${classroomJoinCondition} 
        JOIN "Accounts" ON ${accountJoinCondition} 
        WHERE "Accounts"."type" = 3 AND "Classrooms"."id" 
        IN (SELECT "Classroom_Users"."classroomId" FROM "Classroom_Users"
            WHERE "Classroom_Users"."userId" = :lecturerId )`,
        plain: false, // return all records if false, else return the 1st record
        raw: true,
        type: QueryTypes.SELECT
    }

    return models.sequelize.query(option.sql, {
        plain: option.plain,
        raw: option.raw,
        replacements: {lecturerId: lecturerId},
        type: option.type
    });
}

controller.deleteUserById = id => {
    let option = {
        sql: `DELETE FROM "Users" WHERE "id" = :id`,
        type: QueryTypes.DELETE
    }

    return models.sequelize.query(option.sql, {
        replacements: id,
        type: option.type
    });
}

// update all attribute except primary key and foreign key
controller.updateAllAttributeUser = async (user) => {
    let option = {
        sql: `Update "Users" 
                SET "name" = :name, "email" = :email, "SDT" = :SDT, "DoB" = :DoB,
                WHERE "id" = ${user.id}`,
        type: QueryTypes.UPDATE
    }

    return await models.sequelize.query(option.sql, {
        replacements: {
            name: user.name,
            email: user.email,
            SDT: user.SDT,
            DoB: user.DoB
        },
        type: option.type
    });
}

controller.updateOneAttributeUser = (id, attribute, value) => {
    let option = {
        sql: `UPDATE "Users" 
                SET "${attribute}" = :value
                WHERE "id" = ${id}`,
        type: QueryTypes.UPDATE
    }

    return models.sequelize.query(option.sql, {
        replacements: { value: value},
        type: option.type
    });
}

module.exports = controller;