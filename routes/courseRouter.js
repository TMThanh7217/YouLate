var express = require('express');
var router = express.Router();
let coursesController = require('../controllers/courseController')

router.get('/', (req, res) => {
    // do something here
    coursesController
        .getAll()
        .then(data => {
            console.log(data)
            res.render('courses', {
                pageTitle: 'Courses',
                courses: data,
                active: {
                    courses:true
                }
            })
        })
        .catch(err => res.send(err))
 })

module.exports = router;