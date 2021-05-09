let express = require('express');
const { get } = require('http');
let app = express();
const port = process.env.PORT || 8000;
const models = require('./models');
let exprHbs = require("express-handlebars");

app.use(express.static(__dirname + '/public'));

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
app.use('/classroom', require('./routes/classroomRouter'));

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