var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    // do something here
    res.render('courses', {
        pageTitle: 'Courses',
        active: {
            courses:true
        }
    })
 })

module.exports = router;