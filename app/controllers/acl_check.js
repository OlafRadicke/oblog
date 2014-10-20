"use strict";

var app_config = require('../definitions/app_config.js');

/* This function controlling the access of the clients requests. */
module.exports = {
    'all_request': function (req, res, next) {

        var access_role = "";
        var session_data = "";
        console.log('[routing] Tuhe irgend etwas.... ');
        console.log('[routing] Pfadaufruf: ' + req.path );
        access_role = app_config.souce_acl[req.path];
        console.log('[routing] access_role: ' + access_role );

        session_data = req.session;
        if (session_data.views) {
            session_data.views++
            console.log('[routing] views: ' + session_data.views );
            console.log('[routing] expires in: ' + (session_data.cookie.maxAge / 1000) + 's' );
        } else {
            session_data.views = 1
            session_data.rolls = ["all"]
            console.log('[routing] welcome to the session demo. refresh!' );
        }

        if ( session_data.rolls.indexOf(access_role) != -1) {
            next();
        } else {
            res.redirect('/login')
        }
    }
}
