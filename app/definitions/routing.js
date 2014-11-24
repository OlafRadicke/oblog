"use strict";

var express = require('express');
var app_config = require('./app_config.js');

// controler
var acl_check    = require('../controllers/acl_check.js');
var add_article  = require('../controllers/add_article.js');
var edit_account = require('../controllers/edit_account.js');
var login        = require('../controllers/login.js');
var logout       = require('../controllers/logout.js');
var list_articl  = require('../controllers/list_article.js');

var AppRoutes = {
    init: function( app ) {
        app.all('*', acl_check.all_request );
        app.get('/', list_article.get_request );

        app_config.souce_acl['/'] = 'anonymous';

        app.get( '/add', add_article.get_request ) ;
        app.post( '/add', add_article.post_request );
        app_config.souce_acl['/add'] = 'admin';

        app.get( '/edit_account', edit_account.get_request ) ;
        app.post( '/edit_account', edit_account.post_request );
        app_config.souce_acl['/edit_account'] = 'admin';

        app.get('/error/:message', function (req, res, next) {
            res.render('error.jade', { message: req.params.message});
        })
        app_config.souce_acl['/error'] = 'anonymous';

        app.get( '/login', login.get_request ) ;
        app.post( '/login', login.post_request );
//         app_config.souce_acl.push('/login': 'anonymous');
        app_config.souce_acl["/login"] = "anonymous";


        app.get( '/logout', logout.get_request ) ;
        app_config.souce_acl["/logout"] = "anonymous";


        console.log('[routing] app_config.souce_acl: ' + JSON.stringify(app_config.souce_acl) );

    }
};

module.exports = AppRoutes;
