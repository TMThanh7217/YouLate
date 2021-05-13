var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

router.get('/', async (req, res) => {
    let temp = await userController.findAllStudentBelongToLecturerId(6);
    console.log(temp);
    console.log("Hello");
    return res.json({
        code: 200,
        message: "Hi hi"
    });
});

module.exports = router;