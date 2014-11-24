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
        var session_data = req.session;
        res.render('index.jade', {
            user_name: session_data.user_name,
            message: 'Hier kommen mal Nachrichten!'
        });
    }
}
