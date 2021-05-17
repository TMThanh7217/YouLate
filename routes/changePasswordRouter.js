var express = require('express');
var router = express.Router();
let authorizationAPI = require('../API/authorization-api')

router.get('/', (req, res) => {
    if (!res.locals.isLoggedIn) 
        return authorizationAPI.renderAuthorizationError(res)
    res.locals.sidenav = false
    res.render('changePassword', {
        pageTitle: 'Profile',
    })
       
 })
 router.post('/', (req, res) => {
    console.log(req.body)
    if (!res.locals.isLoggedIn) 
        return authorizationAPI.renderAuthorizationError(res)
    res.locals.sidenav = false
    res.render('changePassword', {
        pageTitle: 'Profile',
    })
 })

module.exports = router;