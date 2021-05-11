var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    // do something here
    res.render('calendar', {
        pageTitle: 'Calendar',
        active: {
            calendar:true
        }
    })
 })

module.exports = router;