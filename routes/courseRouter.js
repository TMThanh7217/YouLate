var express = require('express');
var router = express.Router();
let coursesController = require('../controllers/courseController')

router.get('/', (req, res) => {
    //if(!res.locals.sidenav.courses) return authorizationAPI.renderAuthorizationError(res)

    if (req.query.limit == null || isNaN(req.query.limit))
        req.query.limit = 5;

    if (req.query.page == null || isNaN(req.query.page))
        req.query.page = 1;

    coursesController
        .getAll(req.query)
        .then(data => {
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