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

router.post('/sign-up', async (req, res) => {
    let newAccount = {
        username: req.body.username,
        password: req.body.pwd
    };

    let confirmPassword = req.body.confirmpwd;

    console.log(newAccount);
    console.log("confirmPassword: " + confirmPassword);

    if (newAccount.password != confirmPassword)
        return res.json({
            code: 400,
            message: 'Password & Confirm password not match!'
        });
    
    let accountInstance = await accountController.findByUsername(newAccount.username);
    console.log(accountInstance);
    if(accountInstance)
        return res.json({
            code: 400,
            message: 'Username already exist!'
        })

    let newUser = {
        name: "Unknown",
        email: "Unknown@Host",
        SDT: "Unknown",
        DoB: "Unknown",
        type: 4
    };

    try {
        let userInstance = await userController.createUser(newUser);
        console.log("userId: " + userInstance.id);
        newAccount.userId = userInstance.id;
        accountController.createAccount(newAccount);
        return res.json({
            code:200,
            message: 'Account created successfully!'
        });
    } catch(e) {
        res.json(e);
    }
})

router.post('/sign-in', async (req, res) => {
    let account = {
        username: req.body.username,
        password:  req.body.password
    };

    let remember = req.body.remember;
    let accountInstance = await accountController.findByUsername(account.username);

    //console.log(accountInstance);
    if (!accountInstance) 
        return res.json({
            code: 400,
            message: 'Invalid login, please try again'
        });

    let isMatch = await accountController.comparePassword(account.password, accountInstance.password)
    //console.log("isMatch: " + isMatch);
    if (isMatch) {
        req.session.user = await accountController.findOwnUserByUserId(accountInstance.userId);
        req.session.user.username = accountInstance.username;
        //console.log(req.session.user);
        return res.json({
            code: 200,
            message: 'Log in successfully!'
        });
    }
    else {
        return res.json({
            code: 400,
            message: 'Invalid login, please try again!'
        });
    }
    /*accountController
        .findOwnUserByUserId(accountInstance.userID)
        .then(userInstance => {
            if (!userInstance) 
                return res.json({
                    code: 400,
                    message: 'Unknown ERROR'
                })
        })
        .catch(err => res.json(err));*/
})

router.get('/logout', (req, res, next) => {
    req.session.destroy(error => {
        if (error) {
            return next(error);
        }
        return res.redirect('/');
    })    
});

module.exports = router;