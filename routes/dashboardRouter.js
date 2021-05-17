var express = require('express');
var router = express.Router();
let authorizationAPI = require('../API/authorization-api')

router.get('/', (req, res) => {
    // do something here
    if(!res.locals.sidenav.dashboard) return authorizationAPI.renderAuthorizationError(res)
    
    res.render('dashboard', {
        pageTitle: 'Dash board',
        active: {
            dashboard:true
        }
    })
 })

module.exports = router;