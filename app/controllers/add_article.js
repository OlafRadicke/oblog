"use strict";

var app_config = require('../definitions/app_config.js');

var knex = require('knex')({
    client: app_config.db.client,
    connection: {
        filename: app_config.db.filename
    }
});

module.exports = function(req, res){
    console.log('new artikele....');
    console.log('[add_article] DB-Host ' +  app_config.db.host);
    console.log('[add_article] filename' + app_config.filename);


    res.render('add_article.jade');
}
