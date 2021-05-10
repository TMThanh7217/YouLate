var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    // do something here
    res.render('authorization', {
        pageTitle: 'Authorization'
    })
 })

module.exports = router;