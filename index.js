var express = require('express');
const { get } = require('http');
var app = express();
const port = process.env.PORT || 8000;
var exprHbs = require("express-handlebars");
var models = require('./models');
const bodyParser = require("body-parser")

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let hbs = exprHbs.create({
    extname : "hbs",
    defaultLayout : 'layout',
    layoutsDir : __dirname + '/views/layouts/',
    partialsDir : __dirname + '/views/partials/',
    helpers: {
    }
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');


// Routing here
app.use('/', require('./routes/indexRouter'));
app.use('/classrooms', require('./routes/classroomRouter'));
app.use('/calendar', require('./routes/calendarRouter'))
app.use('/authorization', require('./routes/authorizationRouter'))
app.use('/courses', require('./routes/courseRouter'))
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