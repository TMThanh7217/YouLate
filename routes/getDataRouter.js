var express = require('express');
var router = express.Router();
let eventController = require('../controllers/eventController')
let userController = require('../controllers/userController')
let classroomController = require('../controllers/classroomController')

router.post('/events', async (req, res) => {
    let result = {
        message: "Null",
        data: []
    }
    if(!req.body || !req.body.id) return result
    
    let type = req.body.type
    let events
    switch (type) {
        case 'user':
            events = await eventController.getByUserId(req.body.id)
        case 'classroom':
            events = await eventController.getByClassroomId(req.body.id)
    }

    result.message = "OK"
    result.data = events
    res.json(result)
})

router.post('/attendances', async (req, res) => {
    let result = {
        message: "Null",
        data: []
    }
    if(!req.body || !req.body.eventId) return res.json(result)

 
    let users = await userController.getUserWithAttendanceByEventId(req.body.eventId)

    result.message = "OK"
    result.data = users

    res.json(result)
})

router.post('/classrooms', async (req, res) => {
    let result = {
        message: "Null",
        data: []
    }


    try {
        let responseData = undefined
        console.log(req.body)
        if(req.body && req.body.id)
            responseData =  await classroomController.getById(req.body.id)
        else responseData = await classroomController.getAllClassroomIds()
        if(!responseData) return result

        result.message = 'OK'
        result.data = responseData.map(data => data.id)
    } catch (error) {
        result.message = error.toString()
    }

    res.json(result)
})

module.exports = router;