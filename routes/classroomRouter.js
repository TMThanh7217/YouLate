var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    // do something here
    res.render('classroom', {
        pageTitle: 'Classrooms'
    })
 })

module.exports = router;