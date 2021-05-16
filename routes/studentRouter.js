var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

router.get('/', async (req, res) => {
    let temp = await userController.findAllStudentBelongToLecturerId(req.session.user.id);
    /*console.log(req.session.user.id);
    console.log(req.session.user);*/
    //console.log(temp);
    //console.log("Hello");
    res.render('students', {
        pageTitle: 'Students',
        //students: data,
        active: {
            students: true
        }
    })
    /*return res.json({
        code: 200,
        message: "Hi hi"
    });*/
});

module.exports = router;