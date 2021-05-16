var express = require('express');
var router = express.Router();
var classroomController = require('../controllers/classroomController');

router.get('/', (req, res) => {
    if (req.query.limit == null || isNaN(req.query.limit))
        req.query.limit = 5;

    if (req.query.page == null || isNaN(req.query.page))
        req.query.page = 1;

    classroomController
        .getAll(req.query)
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