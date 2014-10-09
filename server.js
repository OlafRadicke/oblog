"use strict";

var express = require('express');
var app = express();
var AppRoutes  = require('./app/definitions/routing.js');
var app_config = require('./app/definitions/app_config.js');
var db_init = require('./app/definitions/db_init.js');
db_init.check_exist();
db_init.check_update();


app.set('views', __dirname + "/app/views/");
app.set('view engine', 'jade');


AppRoutes.init( app );


var server = app.listen(3000, function() {
    global.global_vars = {bekannt: "ja"};
    console.log('[server] Listening on port %s', server.address().port);

    console.log('[server] filename ' +  app_config.filename);
    console.log('[server] DB-Host ' +  app_config.db.host);
    app_config.db.host = "newhost";
    app_config.filename = "new-file.txt";
    console.log('[server] DB-Host ' +  app_config.db.host);
    console.log('[server] filename' + app_config.filename);

});
