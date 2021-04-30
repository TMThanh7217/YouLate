let express = require('express');
let app = express();

app.set('port', process.env.PORT || 6000);
app.listen(app.get('port'), () => {
    console.log(`Server running at port ${app.get('port')}`);
});