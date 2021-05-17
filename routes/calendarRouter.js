var express = require('express');
var router = express.Router();
let authorizationAPI = require('../API/authorization-api')
let sidenavController = require('../controllers/sidenavController')

router.get('/', (req, res) => {
    // do something here
    if(!sidenav.calendar) return authorizationAPI.renderAuthorizationError(res)
    
    res.render('calendar', {
        pageTitle: 'Calendar',
        active: {
            calendar:true
        }
    })
 })

module.exports = router;