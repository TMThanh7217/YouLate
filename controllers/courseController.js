var controller = {};
var models = require('../models');
var Course = models.Course;
const { QueryTypes } = require('sequelize');

controller.getAll = async (query) => {
    let limit;
    let offset;
    if (query.limit > 0){
        limit = query.limit;
        offset = query.limit * (query.page - 1);
    }

    let option = {
        sql: `SELECT * FROM "Courses" LIMIT ${limit} OFFSET ${offset}`,
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
        sql: 'SELECT * FROM "Courses" WHERE "id" = :id',
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

controller.createCourse = async (course) => {
    return await Course.create(course);
}

// update all attribute except primary key and foreign key
controller.updateAllAttributeCourse = async (course) => {
    let option = {
        sql: `Update "Courses" 
                SET "name" = :name, "code" = :code, "description" = :description
                WHERE "id" = :id`,
        type: QueryTypes.UPDATE
    }

    return await models.sequelize.query(option.sql, {
        replacements: {
            id: course.id,
            name: course.name,
            code: course.code,
            description: course.description
        },
        type: option.type
    });
}

controller.updateOneAttributeCourse = async (id, attribute, value) => {
    let option = {
        sql: `Update "Courses" 
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