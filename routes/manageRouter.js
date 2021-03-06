var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
let coursesController = require('../controllers/courseController');
let authorizationAPI = require('../API/authorization-api');
let userController = require('../controllers/userController');
let accountController = require('../controllers/accountController');
let classController = require('../controllers/classroomController');
let eventController = require('../controllers/eventController')

let deleteCourse = {};
let deleteUser = {};
let editCourse = {};
let editUser = {};
let editAccount = {};
let deleteAccount = {};
let resetAccount = {};

// Course management stuff
router.get('/courses', (req, res) => {
    
    if (req.query.limit == null || isNaN(req.query.limit))
        req.query.limit = 5;

    if (req.query.page == null || isNaN(req.query.page))
        req.query.page = 1;

    if (res.locals.user.type != authorizationAPI.ADMIN) 
        authorizationAPI.renderAuthorizationError(res)

    coursesController
        .getAll(req.query)
        .then(data => {
            res.render('courses', {
                pageTitle: 'Manage - Courses',
                courses: data,
                active: {
                    manageCourses:true
                },
                manageRight: true
            })
        })
        .catch(err => res.send(err))
})

router.post('/courses/addCourse', (req, res) => {
    let newCourse = req.body;
    //console.log(newCourse);
    coursesController
        .createCourse(newCourse)
        .then(data => {
            //console.log(data);
            return res.json({
                code: 200,
                message: 'Course added!'
            });
        })
        .catch(err => res.send(err))
    /*await coursesController.createCourse(newCourse)
    return res.json({
        code: 200,
        message: 'Course added!'
    });*/
});

router.post('/courses/editCourse', async (req, res) => {
    let data = req.body;
    //console.log(data);
    if (data.id != null)
        editCourse = data;
    else {
        let id = editCourse.id;
        //console.log(id);
        let editCourseData = data;
        console.log(editCourseData);
        //console.log("Edited")
        if (editCourseData.name != '')
            await coursesController.updateOneAttributeCourse(id, "name", editCourseData.name);
        
        if (editCourseData.code != '')
            await coursesController.updateOneAttributeCourse(id, "code", editCourseData.code);
            
        if (editCourseData.description != '')
            await coursesController.updateOneAttributeCourse(id, "description", editCourseData.description);
            
        if (editCourseData.topic != '')
            await coursesController.updateOneAttributeCourse(id, "topic", editCourseData.topic);
            
        if (editCourseData.courseLine != '')
            await coursesController.updateOneAttributeCourse(id, "courseLine", editCourseData.courseLine);
            
        if (editCourseData.status != '')
            await coursesController.updateOneAttributeCourse(id, "status", editCourseData.status);

        return res.json({
                code: 200,
                message: 'Course edited!'
            });
    }
    // deleteCourse.isDelete = data.isDelete;
    // coursesController.updateOneAttributeCourse();
    // console.log(deleteCourse);
    // await coursesController.deleteCourseById(deleteCourse.id);
    // return res.json({
    //     code: 200,
    //     message: 'Course edited!'
    // });
});

router.post('/courses/deleteCourse', async (req, res) => {
    let data = req.body;
    //console.log(data);
    if (data.id != null)
        deleteCourse = data;
    else {
        deleteCourse.isDelete = data.isDelete;
        console.log(deleteCourse);
        await coursesController.deleteCourseById(deleteCourse.id);
        return res.json({
            code: 200,
            message: 'Course deleted!'
        });
    }
});

//------------------------------------------------------------------------------------------------------------
// Account management stuff
router.get('/account', (req, res) => {
    if (req.query.limit == null || isNaN(req.query.limit))
        req.query.limit = 5;

    if (req.query.page == null || isNaN(req.query.page))
        req.query.page = 1;

    // if (res.locals.user.type != authorizationAPI.ADMIN) 
    //     authorizationAPI.renderAuthorizationError(res);

    accountController.getAll(req.query)
        .then(async data =>  {
            //console.log(data);
            //console.log(data.length);
            /*for (let i = 0; i < data.length; i++) {
                let type = await accountController.findAttributeById(data[i].accountId, "type");
                data[i].type = type.type; // cai findattribute tra ve object, chiu dung hoi toi : ))
            }*/
            //console.log(data);
            res.render('adminManageAccount', {
                pageTitle: 'Manage - Account',
                account: data,
                active: {
                    manageAccount:true
                },
                manageRight: true
            })
        })
        .catch(err => res.send(err))
});

router.post('/account/addAccount', async (req, res) => {
    let data = req.body;
    let newUser = data.newUser;
    let newAccount = data.newAccount;
    //console.log(data);
    //console.log(newUser);
    //console.log(newAccount);

    let accountCheck = await accountController.findByUsername(newAccount.username);
    if (accountCheck)
        return res.json({
            code: 400,
            message: 'Username has already been taken!'
        });

    let account = await accountController.createAccount(newAccount);
    newUser.accountId = account.id;
    await userController.createUser(newUser);
    return res.json({
        code: 200,
        message: 'Account and user were added!'
    });
});

router.post('/account/editAccount', async (req, res) => {
    let data = req.body;
    //console.log(data);
    if (data.id != null)
        editAccount = data;
    //console.log(editAccount);
    else {
        let id = editAccount.id;
        //console.log(id);
        let editAccountData = data;
        //console.log(editAccountData);
        if (editAccountData.username != '')
            await accountController.updateOneAttributeAccount(id, "username", editAccountData.username);
        
        if (editAccountData.type != '')
            await accountController.updateOneAttributeAccount(id, "type", editAccountData.type);
            
        return res.json({
                code: 200,
                message: 'Account info edited!'
            });
    }
});

router.post('/account/deleteAccount', async (req, res) => {
    let data = req.body;
    //console.log(data);
    if (data.id != null)
        deleteAccount = data;
    else {
        deleteAccount.isDelete = data.isDelete;
        //console.log(deleteAccount);
        await accountController.deleteAccountById(deleteAccount.id);
        return res.json({
            code: 200,
            message: 'Course deleted!'
        });
    }
});

router.post('/account/resetAccountPwd', async (req, res) => {
    let data = req.body;
    if (data.id != null)
        resetAccount = data;
    //console.log(resetAccount);
    else {
        let id = resetAccount.id;
        //console.log(id);
        let userData = await userController.findByAccountId(id);
        console.log(userData);
        let DoB = userData.DoB;
        DoB = DoB.split("/").join(""); // pretty neat trick
        console.log(DoB);
        let saltRounds = 10;
        let salt = bcrypt.genSaltSync(saltRounds);
        let hash = bcrypt.hashSync(DoB, salt);
        await accountController.updateOneAttributeAccount(id, "password", hash);
        return res.json({
                code: 200,
                message: 'Account info edited!'
            });
    }
});
//------------------------------------------------------------------------------------------------------------
// User management stuff
router.get('/users', (req, res) => {
    
    if (req.query.limit == null || isNaN(req.query.limit))
        req.query.limit = 5;

    if (req.query.page == null || isNaN(req.query.page))
        req.query.page = 1;

    // if (res.locals.user.type != authorizationAPI.ADMIN) 
    //     authorizationAPI.renderAuthorizationError(res);

    userController.getAll(req.query)
        .then(async data =>  {
            //console.log(data);
            //console.log(data.length);
            for (let i = 0; i < data.length; i++) {
                let type = await accountController.findAttributeById(data[i].accountId, "type");
                data[i].type = type.type; // cai findattribute tra ve object, chiu dung hoi toi : ))
            }
            //console.log(data);
            res.render('adminManageUser', {
                pageTitle: 'Manage - Users',
                users: data,
                active: {
                    manageUsers:true
                },
                manageRight: true
            })
        })
        .catch(err => res.send(err))
})

router.post('/users/editUser', async (req, res) => {
    let data = req.body;
    //console.log(data);
    if (data.id != null)
        editUser = data;
    //console.log(editUser);
    else {
        let id = editUser.id;
        //console.log(id);
        let editUserData = data;
        console.log(editUserData);
        //console.log("Edited")
        if (editUserData.name != '')
            await userController.updateOneAttributeUser(id, "name", editUserData.name);
        
        if (editUserData.email != '')
            await userController.updateOneAttributeUser(id, "email", editUserData.email);
            
        if (editUserData.SDT != '')
            await userController.updateOneAttributeUser(id, "SDT", editUserData.SDT);
            
        if (editUserData.DoB != '')
            await userController.updateOneAttributeUser(id, "DoB", editUserData.DoB);

        return res.json({
                code: 200,
                message: 'User info edited!'
            });
    }
    // deleteCourse.isDelete = data.isDelete;
    // coursesController.updateOneAttributeCourse();
    // console.log(deleteCourse);
    // await coursesController.deleteCourseById(deleteCourse.id);
    // return res.json({
    //     code: 200,
    //     message: 'Course edited!'
    // });
});

router.post('/users/deleteUser', async (req, res) => {
    let data = req.body;
    //console.log(data);
    if (data.id != null)
        deleteUser = data;
    else {
        deleteUser.isDelete = data.isDelete;
        console.log(deleteUser);
        await userController.deleteUserById(deleteUser.id);
        return res.json({
            code: 200,
            message: 'User deleted!'
        });
    }
});

//------------------------------------------------------------------------------------------------------------
// Classroom management stuff
router.get('/classrooms', (req, res) => {
    
    if (req.query.limit == null || isNaN(req.query.limit))
        req.query.limit = 5;

    if (req.query.page == null || isNaN(req.query.page))
        req.query.page = 1;

    if (res.locals.user.type != authorizationAPI.ADMIN) 
        authorizationAPI.renderAuthorizationError(res)

    classController
        .getAll(req.query)
        .then(data => {
            res.render('classrooms', {
                pageTitle: 'Manage - Classroom',
                classrooms: data,
                active: {
                    manageClassrooms:true
                },
                manageRight: true
            })
        })
        .catch(err => res.send(err))
})

//------------------------------------------------------------------------------------------------------------
// Event management stuff
router.get('/events', async (request, response) => {
    if (request.query.limit == null || isNaN(request.query.limit))
        request.query.limit = 5;

    if (request.query.page == null || isNaN(request.query.page))
        request.query.page = 1;

    // if (res.locals.user.type != authorizationAPI.ADMIN) 
    //     authorizationAPI.renderAuthorizationError(res)

    try {
        let events = await eventController.getAll(request.query)
        response.render('events', {
            pageTitle: 'Manage - Event',
            active: {
                manageEvents: true
            },
            events: events
        })
    } catch (err) { 
        response.render('error', {
            pageTitle: 'Error',
            errTitle: "QUERY Error",
            errMess: err.toString()
        })
    }
})

router.post('/events', async (req, res) => {
    if(!req.body) res.json({
        code: 400,
        message: "Unknown"
    })
    try {
        switch(req.body.action) {
            case "ADD": 
                return res.json({
                    code:200,
                    message: 'Successfully',
                    data: await eventController.createEvent(req.body.data)
                })
            case 'UPDATE':
                return res.json({
                    code:200,
                    message: 'Successfully',
                    data: await eventController.updateAllAttributeEvent(req.body.data)
                })
            case 'REMOVE':
                return res.json({
                    code:200,
                    message: 'Successfully',
                    data: await eventController.removeEventById(req.body.data)
                })
            default:
                return res.json({
                    code:400,
                    message: 'Unknown ACTION'
                })
        
        }
    } catch (error) {
        return res.json({
            code:400,
            message: error.toString()
        })
    }
})

module.exports = router;