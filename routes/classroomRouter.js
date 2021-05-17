var express = require('express');
var router = express.Router();
var classroomController = require('../controllers/classroomController')
let authorizationAPI = require('../API/authorization-api')
let userController = require('../controllers/userController')
let eventController = require('../controllers/eventController')

router.get('/', (req, res) => {
    if(!res.locals.sidenav.classrooms) return authorizationAPI.renderAuthorizationError(res)

    if (req.query.limit == null || isNaN(req.query.limit))
        req.query.limit = 5;

    if (req.query.page == null || isNaN(req.query.page))
        req.query.page = 1;

    classroomController
        .getByLectureId(res.locals.user.id)
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

router.get('/:classroomId/attendances', async (req, res) => {
    let classroomId = req.params.classroomId
    let students = await userController.getStudentsByClassroomId(classroomId)
    let lectures = await userController.getLecturesByClassroomId(classroomId)
    res.render('attendance', {
        pageTitle: "Attendances",
        active: {
            classrooms: true
        },
        students: students,
        lectures: lectures,
        classroomId: classroomId
    })
})

router.post('/:classroomId/events', async (req, res) => {
    let events = await eventController.getByClassroomId(classroomId)
    res.json({
        message: 'Got it',
        data: events
    })
})

router.post('/:classroomId/attendances', async (req, res) => {
    let classroomId = req.params.classroomId
    let data = req.body.list
    console.log(data)
    res.json({
        message:'Checking attendances Successfully!!!'
    })
})

module.exports = router;