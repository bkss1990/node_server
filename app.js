var express = require('express');
var app = express();
var morgan = require('morgan');
var cors = require('cors')

var approuter = require("./router/router")
var db = require('./db');
global.__root   = __dirname + '/'; 
app.use(cors())

app.use(morgan('combined'));

app.get('/api', function (req, res) {
  res.status(200).send('API works.');
});

var UserController = require(__root + 'controller/user/UserController');
app.use('/api/users', UserController);

// var AuthController = require(__root + 'controller/auth/AuthController');

app.use('/api/auth', approuter);

module.exports = app;