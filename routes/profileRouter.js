var express = require('express');
var router = express.Router();
let userController = require('../controllers/userController')
let authorizationAPI = require('../API/authorization-api')

router.get('/', (req, res) => {
    if (!res.locals.isLoggedIn) 
        return authorizationAPI.renderAuthorizationError(res)

    res.render('profile', {
        pageTitle: 'Profile',
        active: {
            profile:true
        }
    })
       
 })

module.exports = router;