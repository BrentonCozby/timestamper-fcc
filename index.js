var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('pages/index');
});

app.get('/:timestamp', (req, res) => {
    var date = new Date(req.params.timestamp);

    if (isNaN(date.valueOf())) {
        date = new Date(+req.params.timestamp * 1000);
    }

    res.end(JSON.stringify({
        unix: date.getTime() / 1000,
        natural: date.toLocaleDateString()
    }));
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
