"use strict";

var express = require('express');
var app = express();
var session = require('express-session');
var csrf = require('csurf')

var AppRoutes  = require('./app/definitions/routing.js');
var app_config = require('./app/definitions/app_config.js');
var db_init = require('./app/definitions/db_init.js');
var bodyParser = require('body-parser');

// Database prepare
db_init.check_exist();
db_init.check_update();

// Set session engine
app.use(session({
    secret: 'oblog-3553-742-de',
    cookie: { maxAge: 60000 },
    proxy: true,
    resave: true,
    saveUninitialized: true
}));

// View prepare with a template engine
app.set('views', __dirname + "/app/views/");
app.set('view engine', 'jade');
// switch on newlines in Jade
app.locals.pretty = true;

// Prepare body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Add the csrf module for CSRF protection.
app.use(csrf())
// error handler
app.use(function (err, req, res, next) {
  console.log('[server] err.code: ' + err.code);
  if (err.code !== 'EBADCSRFTOKEN') return next(err)

  // handle CSRF token errors here
  res.status(403)
  res.send('session has expired or form tampered with')
})


// Prepare the routes
AppRoutes.init( app );

var server = app.listen(3000, function() {
    global.global_vars = {bekannt: "ja"};
    console.log('[server] Listening on port ' + server.address().port);

});
