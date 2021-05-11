var controller = {};
var models = require('../models');
var Classroom = models.Classroom;

controller.getAll = () => {
    return new Promise((resolve, reject) => {
        Classroom
            .findAll({
                    attributes: ['name', 'startDate',  'endDate',  'course', 'status', 'hours'],
                    raw:true
                }
            )
            .then(data => resolve(data))
            .catch(err => reject(new Error(err)));
    });
};

module.exports = controller;