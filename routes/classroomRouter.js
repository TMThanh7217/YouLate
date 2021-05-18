var express = require('express');
var router = express.Router();
var classroomController = require('../controllers/classroomController')
let authorizationAPI = require('../API/authorization-api')
let userController = require('../controllers/userController')
let eventController = require('../controllers/eventController')
let eventUserController = require('../controllers/Event_UserController')

router.get('/', (req, res) => {
    if(!res.locals.sidenav.classrooms) return authorizationAPI.renderAuthorizationError(res)

    if (req.query.limit == null || isNaN(req.query.limit))
        req.query.limit = 5;

    if (req.query.page == null || isNaN(req.query.page))
        req.query.page = 1;

    classroomController
        .getByLectureId(res.locals.user.id)
        .then(data => {
            res.render('classrooms', {
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
    // if(!res.locals.sidenav.classrooms && !res.locals.sidenav.manage) return authorizationAPI.renderAuthorizationError(res)

    let classroomId = req.params.classroomId
    let students = await userController.getStudentsByClassroomId(classroomId)
    let lectures = await userController.getLecturesByClassroomId(classroomId)
    let events = await eventController.getByClassroomId(classroomId)
    if (events.length > 0) events[events.length - 1].active = true
    let lastEvent = events[events.length - 1]
    for (let student of students) {
        let attendance = await eventController.getAttendanceTypeByEventIdAndUserId(lastEvent.id, student.id)
        student.attendance = {}
        if(attendance)
            student.attendance[attendance.type] = true
    }
    for (let lecture of lectures) {
        let attendance = await eventController.getAttendanceTypeByEventIdAndUserId(lastEvent.id, lecture.id)
        lecture.attendance = {}
        if(attendance)
            lecture.attendance[attendance.type] = true
    }
    res.render('attendance', {
        pageTitle: "Attendances",
        active: {
            classrooms: true
        },
        students: students,
        lectures: lectures,
        classroomId: classroomId,
        events: events,
        edit: res.locals.sidenav.manage ? true : lastEvent.edit
    })
})

router.post('/:classroomId/attendances', async (req, res) => {
    try {
        let listPromise = eventUserController.updateAttendanceTypesByListAttendancesAndEventId(req.body.eventId, req.body.list)
        for(let promiseQuery of listPromise)
            await promiseQuery
        res.json({
            code: 200,
            message: 'Successfully'
        })
    } catch (error) {
        res.json({
            code: 400,
            message: error.toString()
        })
    }
})

module.exports = router;