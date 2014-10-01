"use strict";

var express = require('express');
var app = express();
var AppRoutes  = require('./app/definitions/routing.js');


app.set('views', __dirname + "/app/views/");
app.set('view engine', 'jade');


AppRoutes.init( app );


var server = app.listen(3000, function() {
    global.global_vars = {bekannt: "ja"};
    console.log('Listening on port %d', server.address().port);

});
