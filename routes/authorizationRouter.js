var express = require('express');
var router = express.Router();
let accountController = require('../controllers/accountController')
let userController = require('../controllers/userController')

router.get('/', (req, res) => {
    // do something here
    res.render('authorization', {
        pageTitle: 'Authorization'
    })
})

router.post('/sign-up', (req, res) => {
    let newAccount = {
        username: req.body.username,
        password: req.body.pwd
    }

    let confirmPassword = req.body.confirmpwd

    console.log(newAccount)
    console.log(confirmPassword)

    if (newAccount.password != confirmPassword)
        return res.json({
            code: 400,
            message: 'Password & Confirm password not match!'
        })
    
    accountController
        .findByUsername(newAccount.username)
        .then(accountInstance => {
            if(accountInstance)
                return res.json({
                    code: 400,
                    message: 'Username already exist!'
                })
        })
        .catch(err => res.json(err))

    let newUser = {
        name: "Unknown",
        email: "Unknown@Host",
        SDT: "Unknown",
        DoB: "Unknown",
        type: 0
    }
    try {
        let userInstance = userController.createUser(newUser)
        console.log(userInstance.id)    
        newAccount.userId = userInstance.id
        accountController.createAccount(newAccount)
        return res.json({
            code:200,
            message: 'Account created successfully!'
        })    
    } catch(e) {
        res.json(e)
    }
})

router.post('/sign-in', (req, res) => {
    let username = req.body.username
    accountController
        .findByUsername(username)
        .then(accountInstance => {
            if (!accountInstance) 
                return res.json({
                    code: 400,
                    message: 'USERNAME or PASSWORD are wrong!'
                })

            accountController
                .findOwnUserByUserId(accountInstance.userID)
                .then(userInstance => {
                    if (!userInstance) 
                        return res.json({
                            code: 400,
                            message: 'Unknown ERROR'
                        })
                    
                })
        })
        .catch(err => res.json(err))
        
})

module.exports = router;