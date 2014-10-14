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
        console.log('login...');

        res.render('login.jade');
    },
    'post_request': function (req, res) {
        console.log('login....');
        var updatetime = new Date();

        console.log('[add_article] Name: ' + req.body.name);
        console.log('[add_article] Password: ' + req.body.password);

//         knex('article').insert( [
//             {version_number: 1},
//             {last_update: updatetime},
//             {title: req.body.title},
//             {teaser: req.body.teaser},
//             {body: req.body.body},
//             {state: req.body.state}
//         ] ).debug().then(function(inserts) {
//               console.log(inserts.length + ' new article saved.');
//         });

        res.render('login.jade');
    }
}
