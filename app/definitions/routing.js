"use strict";

var add_article = require('../controllers/add_article.js');
var express = require('express');
var AppRoutes = {
    init: function( app ) {
        app.get('/', function(req, res){
            res.render('index.jade', { message: 'Hello there!'});
//             res.send('Hello World');
        });
        app.get('/add', require('../controllers/add_article.js') );
    }
};

module.exports = AppRoutes;
