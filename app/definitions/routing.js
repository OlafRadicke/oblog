"use strict";

var express = require('express');
var app_config = require('./app_config.js');

// controler
var acl_check    = require('../controllers/acl_check.js');
var add_article  = require('../controllers/add_article.js');
var edit_account = require('../controllers/edit_account.js');
var login        = require('../controllers/login.js');

var AppRoutes = {
    init: function( app ) {
        app.all('*', acl_check.all_request );

        app.get('/', function(req, res){
            res.render('index.jade', { message: 'Hello there!'});
        });
        app_config.souce_acl.push({'/': 'anonymous'});

        app.get( '/add', add_article.get_request ) ;
        app.post( '/add', add_article.post_request );
        app_config.souce_acl.push({'/add': 'admin'});

        app.get( '/edit_account', edit_account.get_request ) ;
        app.post( '/edit_account', edit_account.post_request );
        app_config.souce_acl.push({'/edit_account': 'admin'});

        app.get('/error/:message', function (req, res, next) {
            res.render('error.jade', { message: req.params.message});
        })
        app_config.souce_acl.push({'/error': 'anonymous'});

        app.get( '/login', login.get_request ) ;
        app.post( '/login', login.post_request );
        app_config.souce_acl.push({'/login': 'anonymous'});


        console.log('[routing] app_config.souce_acl: ' + JSON.stringify(app_config.souce_acl) );

    }
};

module.exports = AppRoutes;
