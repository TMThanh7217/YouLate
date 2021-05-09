let express = require('express');
let app = express();
const port = process.env.PORT || 6000;
const models = require('./models');

app.use(express.static(__dirname + '/public'));







// Routing here
app.use('/', require('./routes/indexRouter'));
app.use('/classroom', require('./routes/classroomRouter'));

// listen log
app.listen(port, () => {
    console.log(`Server running at https://localhost:${port}`);
});

// sync database
app.get('/sync', (req, res) => {
    models.sequelize.sync()
    .then(() => {
        res.send('Database synced completed');
    });
});