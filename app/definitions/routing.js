"use strict";

var express = require('express');
var add_article = require('../controllers/add_article.js');
var login = require('../controllers/login.js');

var AppRoutes = {
    init: function( app ) {
        app.get('/', function(req, res){
            res.render('index.jade', { message: 'Hello there!'});
//             res.send('Hello World');
        });

        app.get( '/add', add_article.get_request ) ;
        app.post( '/add', add_article.post_request );

        app.get( '/login', login.get_request ) ;
        app.post( '/login', login.post_request );

    }
};

module.exports = AppRoutes;
