"use strict";

var app_config = require('../definitions/app_config.js');

/* This function controlling the access of the clients requests. */
module.exports = {
    'all_request': function (req, res, next) {

        var access_role = "";
        var session_data = "";
        console.log('[acl_check] Pfadaufruf: #' + req.path + '#');

        if ( req.path ==  '/login' ){
            console.log('[acl_check] we are on the right site. Do nothing....' );
            next();
            return;
        }

        access_role = app_config.souce_acl[req.path];

        if ( !req.path in app_config.souce_acl ) {
            console.log('[acl_check] key "' + req.path + '" is not in list.' );
            console.log('[acl_check] go to login....' );
            res.redirect('/login')
            return;

        } else {
            console.log('[acl_check] key "' + req.path + '" is in list: ' + app_config.souce_acl[req.path] );
        }
        console.log('[acl_check] access_role: ' + access_role );
        if ( access_role === "anonymous" ) {
            console.log('[acl_check] Site is for all. Do nothing....' );
            next();
            return;
        }

        session_data = req.session;
        if (session_data.rolls) {
            console.log('[acl_check] session_data.rolls: ' + session_data.rolls );
            console.log('[acl_check] expires in: ' + (session_data.cookie.maxAge / 1000) + 's' );
        } else {
            session_data.rolls = ["anonymous"]
            console.log('[acl_check] set first roll "anonymous".' );
        }

        if ( session_data.rolls.indexOf(access_role) != -1 ) {
            console.log('[acl_check] acl is okay.' );
            next();
        } else {
            console.log('[acl_check] acl is not okay.' );
            if ( req.path !=  '/login' ){
                console.log('[acl_check] go to login....' );
                res.redirect('/login')
                return;
            }
            next();
        }
    }
}
