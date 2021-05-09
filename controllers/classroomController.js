let controller = {};
let models = require('../models');
let Classroom = models.Classroom;

controller.getAll = () => {
    return new Promise((resolve, reject) => {
        Classroom
            .findAll()
            .then(data => resolve(data))
            .catch(err => reject(new Error(err)));
    });
};

module.exports = controller;