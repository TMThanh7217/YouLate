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
    let option = {
        sql: 'SELECT * FROM "Classrooms"',
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
        sql: 'SELECT "name", "startDate", "endDate", "course", "status", "hours" FROM "Classrooms" where "id" = :id',
        plain: false, // return all records if false, else return the 1st record
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

controller.createClassroom = async (classrom) => {
    return await Classroom.create(classrom);
}

module.exports = controller;