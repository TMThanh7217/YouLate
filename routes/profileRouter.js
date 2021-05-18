var express = require('express');
var router = express.Router();
let userController = require('../controllers/userController');
let authorizationAPI = require('../API/authorization-api');
let accountController = require('../controllers/accountController');

router.get('/', async (req, res) => {
    if (!res.locals.isLoggedIn) 
        return authorizationAPI.renderAuthorizationError(res)

    let user = await userController.findById(req.session.user.id);
    let account = await accountController.findById(user.accountId);

    let type = account.type;
    let userType = {};
    switch (type) {
        case 0:
            userType.isAdmin = true;
            break;
        case 1:
            userType.isLecturer = true;
            break;
        case 2:
            userType.isTA = true;
            break;
        case 3:
            userType.isStudent = true;
            break;
        default:
            userType.isStudent = true;
    }

    res.render('profile', {
        pageTitle: 'Profile',
        user: user,
        userType: userType,
        account: account,
        active: {
            profile:true
        }
    })
});

router.post('/edit', async (req, res) => {
    let data = req.body;
    //console.log(data);
    let account = await accountController.findByUsername(data.username);
    //console.log(req.session.user);
    if (account == null) {
        let user = await userController.findByAccountId(req.session.user.id);
        if (data.username != "")
            await accountController.updateOneAttributeAccount(user.accountId, "username", data.username)

        if (data.name != "")
            await userController.updateOneAttributeUser(user.id, "name", data.name)

        if (data.email != "")
            await userController.updateOneAttributeUser(user.id, "email", data.email)

        if (data.phoneNum != "")
            await userController.updateOneAttributeUser(user.id, "SDT", data.phoneNum)

        if (data.DoB != "")
            await userController.updateOneAttributeUser(user.id, "DoB", data.DoB)

        return res.json({
            code: 200,
            message: 'Your profile has been updated!'
        });
    }
    else {
        return res.json({
            code: 400,
            message: 'Username has already been taken!'
        });
    }
});

module.exports = router;