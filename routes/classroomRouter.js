var express = require('express');
var router = express.Router();
var classroomController = require('../controllers/classroomController');

router.get('/', (req, res) => {
    // do something here
    classroomController
        .getAll()
        .then(data => {
            res.render('classroom', {
                pageTitle: 'Classrooms',
                classrooms: data,
                active: {
                    classrooms:true
                }
            })
        })
        .catch(err => res.send("Error: " + err));
 })

module.exports = router;