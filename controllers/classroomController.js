var controller = {};
var models = require('../models');
var Classroom = models.Classroom;
const { QueryTypes } = require('sequelize');

controller.createClassroom = async (classroom) => {
    return await Classroom.create(classroom);
}

controller.getAll = async (query) => {
    /*return new Promise((resolve, reject) => {
        let option = {
            attributes: ['name', 'startDate',  'endDate',  'course', 'status', 'hours'],
            raw:true,
            where: {}
        }

        Classroom
            .findAll(option)
            .then(data => resolve(data))
            .catch(err => reject(new Error(err)));
    });*/
    // example sql: SELECT "name", "startDate", "endDate", "course", "status", "hours" FROM "Classrooms" AS "Classroom";
    let limit;
    let offset;
    if (query.limit > 0){
        limit = query.limit;
        offset = query.limit * (query.page - 1);
    }

    let option = {
        sql: `SELECT * FROM "Classrooms" LIMIT ${limit} OFFSET ${offset}`,
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

controller.getById = async (id) => {
    let option = {
        sql: 'SELECT "name", "startDate", "endDate", "course", "status", "hours" FROM "Classrooms" where "id" = :id',
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

controller.getByLectureId = id => {
    let sql = ''
    sql += 'SELECT "Classrooms"."id", "Classrooms"."name", "Classrooms"."startDate", "Classrooms"."endDate", "Classrooms"."course", "Classrooms"."status", "Classrooms"."hours"'
    sql += 'FROM "Classrooms" JOIN "Classroom_Users" ON ("Classrooms"."id" = "Classroom_Users"."classroomId")'
    sql += `WHERE "Classroom_Users"."userId" = ${id}`
    let option = {
        sql: sql,
        plain: false, // return all records if false, else return the 1st record
        raw: true,
        type: QueryTypes.SELECT
    }

    return models.sequelize.query(option.sql, {
        plain: option.plain,
        raw: option.raw,
        type: option.type
    });
}

controller.createClassroom = async (classrom) => {
    return await Classroom.create(classrom);
}

// update all attribute except primary key and foreign key
controller.updateAllAttributeClassroom = async (classroom) => {
    let option = {
        sql: `Update "Classrooms" 
                SET name = :name, startDate = :startDate, endDate = :endDate,
                course = :course, status = :status, hours = :hours
                WHERE "id" = ${classroom.id}`,
        type: QueryTypes.UPDATE
    }

    return await models.sequelize.query(option.sql, {
        replacements: {
            name: classroom.name,
            startDate: classroom.startDate,
            endDate: classroom.endDate,
            course: classroom.course,
            status: classroom.status,
            hours: classroom.hours
        },
        type: option.type
    });
}

controller.updateOneAttributeClassroom = async (id, attribute, value) => {
    let option = {
        sql: `Update "Classrooms" 
                SET "${attribute}" = :value
                WHERE "id" = ${id}`,
        type: QueryTypes.UPDATE
    }

    return await models.sequelize.query(option.sql, {
        replacements: { value: value },
        type: option.type
    });
}

controller.getAllClassroomIds = () => {
    let sql = 'SELECT "Classrooms"."id" FROM "Classrooms"'
    let option = {
        plain: false, // return all records if false, else return the 1st record
        raw: true,
        type: QueryTypes.SELECT
    }
    return models.sequelize.query(sql, option)
}

module.exports = controller;