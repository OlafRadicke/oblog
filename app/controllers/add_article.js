"use strict";

var app_config = require('../definitions/app_config.js');

var knex = require('knex')({
    client: app_config.db.client,
    connection: {
        filename: app_config.db.filename
    }
});

module.exports = {
    'get_request': function (req, res) {
        console.log('new artikele....');
        console.log('[add_article] DB-Host ' +  app_config.db.host);
        console.log('[add_article] filename' + app_config.filename);

        res.render('add_article.jade');
    },
    'post_request': function (req, res) {
        console.log('new artikele....');
        var updatetime = new Date();

        console.log('[add_article] DB-Host ' +  app_config.db.host);
        console.log('[add_article] filename' + app_config.filename);

        console.log('[add_article] Titel: ' + req.body.title);
        console.log('[add_article] Status: ' + req.body.state);
        console.log('[add_article] Anriss: ' + req.body.teaser);
        console.log('[add_article] Artikel: ' + req.body.body);

        knex('article').insert( [
            {version_number: 1},
            {last_update: updatetime},
            {title: req.body.title},
            {teaser: req.body.teaser},
            {body: req.body.body},
            {state: req.body.state}
        ] ).debug().then(function(inserts) {
              console.log(inserts.length + ' new article saved.');
        });

        res.render('add_article.jade');
    }
}
