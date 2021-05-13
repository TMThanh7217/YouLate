module.exports = {
    getSideNav: userType => {
        let sidenav = {}
        switch (userType) {
           case 0: {//ADMIN
              sidenav.dashboard = true
              sidenav.profile = true
              sidenav.manage = true
              break
           }
           case 1: case 2: {// MAIN LECTURE, SUB LECTURE
              sidenav.dashboard = true
              sidenav.profile = true
              sidenav.courses = true
              sidenav.classrooms = true
              sidenav.students = true
              sidenav.calendar = true
              break
           }
           case 3: { // STUDENT
              sidenav.profile = true
              sidenav.courses = true
              sidenav.classrooms = true
              sidenav.calendar = true
              break
           }
           default: {
              sidenav.profile = true
              sidenav.courses = true
           }
        }
        return sidenav
    }
}