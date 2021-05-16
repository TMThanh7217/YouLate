var controller = {};
var models = require('../models');
var User = models.User;
var accountController = require('./accountController');
let authorizationAPI = require('../API/authorization-api')

const { QueryTypes } = require('sequelize');
const { Sequelize } = require('../models');

controller.getAll = async (query) => {
    let option = {
        sql: 'SELECT * FROM "Users"',
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

module.exports = controller;