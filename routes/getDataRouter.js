var express = require('express');
var router = express.Router();
let eventController = require('../controllers/eventController')

router.post('/events', async (req, res) => {
    let result = {
        message: "Null",
        data: []
    }
    if(!req.query || !req.query.id) return result
    
    let type = req.query.type
    let events
    switch (type) {
        case 'user':
            events = await eventController.getByUserId(req.query.id)
        case 'classroom':
            events = await eventController.getByClassroomId(req.query.id)
    }

    result.message = "OK"
    result.data = events
    res.json(result)
})

module.exports = router;