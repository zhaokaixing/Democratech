const express     = require('express');
const http      = require('http');
const cors        = require('cors');
const path        = require('path');
const bodyParser  = require('body-parser');
const security    = require('./tools/security');
// var authenticate = security.auth0Jwt;

const port = 3000;

var index = require('./routes/index');
let organisations = require('./routes/API/organisations');
let departments = require('./routes/API/departments');
let users = require('./routes/API/users');
let cities = require('./routes/API/cities');
let citizens = require('./routes/API/citizens');
let project = require('./routes/API/projects');
let comment = require('./routes/API/comments');
let opinion=require('./routes/API/opinion');
let app = express();

// View engine
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);

// Set static folders
// app.use(express.static(path.join(__dirname, '../client')));
// app.use(express.static(path.join(__dirname, 'views')));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(cors);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  res.header("access-control-allow-headers", "origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Methods, Access-Control-Allow-Origin");
  res.header("Content-Type", "application/json");
  next();
});

// app.use('/', index);
app.use('/api', organisations);
app.use('/api', departments);
app.use('/api', cities);
app.use('/api', citizens);
app.use('/api', users);
app.use('/api', project);
app.use('/api',comment);
app.use('/api',opinion);
// app.use('**', index);

app.listen(port, function(){
  console.log('server start on port '+port);
})

// app.set('port', port);
// const server = http.createServer(app);
// server.listen(port, () => console.log(`API running on localhost:${port}`));
