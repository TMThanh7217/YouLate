var express = require('express');
var router = express.Router();
let coursesController = require('../controllers/courseController');
let authorizationAPI = require('../API/authorization-api');
let userController = require('../controllers/userController');
let accountController = require('../controllers/accountController');
let classController = require('../controllers/classroomController');
let deleteCourse = {};
let deleteUser = {};
let eventController = require('../controllers/eventController')

router.get('/courses', (req, res) => {
    
    if (req.query.limit == null || isNaN(req.query.limit))
        req.query.limit = 5;

    if (req.query.page == null || isNaN(req.query.page))
        req.query.page = 1;

    if (res.locals.user.type != authorizationAPI.ADMIN) 
        authorizationAPI.renderAuthorizationError(res)

    coursesController
        .getAll(req.query)
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

router.post('/courses/editCourse', (req, res) => {
    let newCourse = req.body;
    console.log(newCourse);
    coursesController
        .createCourse(newCourse)
        .then(data => {
            //console.log(data);
            return res.json({
                code: 200,
                message: 'Course added!'
            });
        })
        .catch(err => res.send(err))
    /*await coursesController.createCourse(newCourse)
    return res.json({
        code: 200,
        message: 'Course added!'
    });*/
});

router.post('/courses/deleteCourse', async (req, res) => {
    let data = req.body;
    //console.log(data);
    if (data.id != null)
        deleteCourse = data;
    else {
        deleteCourse.isDelete = data.isDelete;
        console.log(deleteCourse);
        await coursesController.deleteCourseById(deleteCourse.id);
        return res.json({
            code: 200,
            message: 'Course deleted!'
        });
    }
});

router.get('/users', (req, res) => {
    
    if (req.query.limit == null || isNaN(req.query.limit))
        req.query.limit = 5;

    if (req.query.page == null || isNaN(req.query.page))
        req.query.page = 1;

    // if (res.locals.user.type != authorizationAPI.ADMIN) 
    //     authorizationAPI.renderAuthorizationError(res);

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

router.post('/users/deleteUser', async (req, res) => {
    let data = req.body;
    //console.log(data);
    if (data.id != null)
        deleteUser = data;
    else {
        deleteUser.isDelete = data.isDelete;
        console.log(deleteUser);
        await userController.deleteUserById(deleteUser.id);
        return res.json({
            code: 200,
            message: 'User deleted!'
        });
    }
});

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
            res.render('classrooms', {
                pageTitle: 'Manage - Classroom',
                classrooms: data,
                active: {
                    manageClassrooms:true
                },
                manageRight: true
            })
        })
        .catch(err => res.send(err))
})

router.get('/events', async (request, response) => {
    if (request.query.limit == null || isNaN(request.query.limit))
        request.query.limit = 5;

    if (request.query.page == null || isNaN(request.query.page))
        request.query.page = 1;

    // if (res.locals.user.type != authorizationAPI.ADMIN) 
    //     authorizationAPI.renderAuthorizationError(res)

    try {
        let events = await eventController.getAll(request.query)
        response.render('events', {
            pageTitle: 'Manage - Event',
            active: {
                manageEvents: true
            },
            events: events
        })
    } catch (err) { 
        response.render('error', {
            pageTitle: 'Error',
            errTitle: "QUERY Error",
            errMess: err.toString()
        })
    }
})

module.exports = router;