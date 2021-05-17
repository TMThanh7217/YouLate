var express = require('express');
var router = express.Router();
let coursesController = require('../controllers/courseController');
let authorizationAPI = require('../API/authorization-api');
let userController = require('../controllers/userController');
let accountController = require('../controllers/accountController');
let classController = require('../controllers/classroomController');

router.get('/courses', (req, res) => {
    
    if (req.query.limit == null || isNaN(req.query.limit))
        req.query.limit = 5;

    if (req.query.page == null || isNaN(req.query.page))
        req.query.page = 1;

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

router.get('/users', (req, res) => {
    
    if (req.query.limit == null || isNaN(req.query.limit))
        req.query.limit = 5;

    if (req.query.page == null || isNaN(req.query.page))
        req.query.page = 1;

    if (res.locals.user.type != authorizationAPI.ADMIN) 
        authorizationAPI.renderAuthorizationError(res);

    userController.getAll(req.query)
        .then(async data =>  {
            //console.log(data);
            //console.log(data.length);
            for (let i = 0; i < data.length; i++) {
                let type = await accountController.findAttributeById(data[i].accountId, "type");
                data[i].type = type.type; // cai findattribute tra ve object, chiu dung hoi toi : ))
            }
            //console.log(data);
            res.render('adminManageUser', {
                pageTitle: 'Manage - Users',
                users: data,
                active: {
                    manageUsers:true
                },
                manageRight: true
            })
        })
        .catch(err => res.send(err))
})

router.get('/classrooms', (req, res) => {
    
    if (req.query.limit == null || isNaN(req.query.limit))
        req.query.limit = 5;

    if (req.query.page == null || isNaN(req.query.page))
        req.query.page = 1;

    if (res.locals.user.type != authorizationAPI.ADMIN) 
        authorizationAPI.renderAuthorizationError(res)

    classController
        .getAll(req.query)
        .then(data => {
            console.log(data);
            res.render('manageClassrooms', {
                pageTitle: 'Manage - Classrooms',
                classes: data,
                active: {
                    manageClassrooms:true
                },
                manageRight: true
            })
        })
        .catch(err => res.send(err))

})

module.exports = router;