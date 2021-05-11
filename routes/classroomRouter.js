var express = require('express');
var router = express.Router();
var classroomController = require('../controllers/classroomController');

router.get('/', (req, res) => {
    // do something here
    classroomController
        .getAll()
        .then(data => {
            res.locals.classrooms = data;
            res.render('classroom', {
                pageTitle: 'Classrooms'
            })
        })
        .catch(err => res.send("Error: " + err));
 })

module.exports = router;