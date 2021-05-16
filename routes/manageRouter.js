var express = require('express');
var router = express.Router();
let coursesController = require('../controllers/courseController')
let authorizationAPI = require('../API/authorization-api')

router.get('/courses', (req, res) => {
    // do something here
    if (res.locals.user.type != authorizationAPI.ADMIN) 
        authorizationAPI.renderAuthorizationError(res)

    coursesController
        .getAll()
        .then(data => {
            res.render('courses', {
                pageTitle: 'Manage - Courses',
                courses: data,
                active: {
                    manageCourses:true
                },
                manageRight: true
            })
        })
        .catch(err => res.send(err))
 })

module.exports = router;