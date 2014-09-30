"use strict";

var express = require('express');
var AppRoutes = {
    init: function( app ) {
        app.get('/', function(req, res){
            res.render('index.jade', { message: 'Hello there!'});
//             res.send('Hello World');
        });
        app.get('/add', function(req, res){
            res.render('add_article.jade');
//             res.send('Hello World');
        });
    }
};

module.exports = AppRoutes;
