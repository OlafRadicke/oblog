"use strict";

var app_config = require('../definitions/app_config.js');

module.exports = function(req, res){
    console.log('new artikele....');
    console.log('[add_article] DB-Host ' +  app_config.db.host);
    console.log('[add_article] filename' + app_config.filename);

//     var app_config = require('./app/definitions/app_config.js');
//     console.log('[add_article] DB-Host %d', app_config.db.host);

    var mongoose = require('mongoose');
    mongoose.createConnection('mongodb://localhost/oblog');

    var Article = mongoose.model(
        'Article',
        {
            title: String,
            body: String
        }
    );

    var new_article = new Article({
        title: 'Titel',
        body: 'Der Text'
    });
    new_article.save(function (err) {
      if (err) // ...
      console.log('save...');
    });

    mongoose.connection.close();
    res.render('add_article.jade');
}
