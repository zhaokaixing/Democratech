var express     = require('express');
var path        = require('path');
var bodyParser  = require('body-parser');
var security    = require('./tools/security')
var authenticate = security.auth0Jwt;

var port = 3000;

var index = require('./routes/index');
var organisations = require('./routes/API/organisations');
var departments = require('./routes/API/departments');
var cities = require('./routes/API/cities');
var citizens = require('./routes/API/citizens');

var app = express();

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set static folder
app.use(express.static(path.join(__dirname, 'client')));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('**', index);
app.use('/api', organisations);
app.use('/api', departments);
app.use('/api', cities);
app.use('/api', citizens);

app.listen(port, function(){
    console.log('server start on port '+port);
});

