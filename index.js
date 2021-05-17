var express = require('express');
const { get } = require('http');
var app = express();
const port = process.env.PORT || 8000;
var exprHbs = require("express-handlebars");
var models = require('./models');
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser');
let session = require('express-session');
let sidenavController = require('./controllers/sidenavController')


// App Use
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    cookie: { httpOnly: true, maxAge: null },
    secret: "S3cret",
    resave: false,
    saveUninitialized: false
}));

let hbs = exprHbs.create({
    extname : "hbs",
    defaultLayout : 'layout',
    layoutsDir : __dirname + '/views/layouts/',
    partialsDir : __dirname + '/views/partials/',
    helpers: {
    }
});

app.use((req, res, next) => {
    res.locals.user = req.session.user ? req.session.user : {}
    res.locals.sidenav = req.session.user ? sidenavController.getSideNav(req.session.user.type) : {}
    res.locals.username = req.session.user ? req.session.user.username : "";
    res.locals.isLoggedIn = req.session.user ? true : false;
    next();
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');


// Routing here
app.use('/', require('./routes/indexRouter'));
app.use('/classrooms', require('./routes/classroomRouter'));
app.use('/calendar', require('./routes/calendarRouter'));
app.use('/authorization', require('./routes/authorizationRouter'));
app.use('/courses', require('./routes/courseRouter'));
app.use('/student', require('./routes/studentRouter'));
app.use('/manage', require('./routes/manageRouter'))
app.use('/profile', require('./routes/profileRouter'))
app.use('/change-password', require('./routes/changePasswordRouter'))

// listen log
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// sync database
app.get('/sync', (req, res) => {
    models.sequelize.sync()
    .then(() => {
        res.send('Database synced completed');
    });
});