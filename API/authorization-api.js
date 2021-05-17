module.exports = {
    ADMIN: 0,
    LECTURE: 1,
    SUB_LECTURE:2,
    STUDENT:3,
    GUEST:4,
    renderAuthorizationError: res => res.render('error', {
                                        pageTitle: 'Error',
                                        errTitle: "Authorization Error - Access Denied",
                                        errMess: "You are not allowed to access this page!!!"
                                    })
}