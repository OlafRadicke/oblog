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
        console.log( '[list_article] get_request ' );
        var session_data = req.session;
        var articlelist = "<div class=\"span4\" id=\"innerbox\" >";

        knex('article')
            .select('updatetime', 'title', 'teaser')
            .where({state: 'Veröffentlicht'})
            .debug()
            .then( function(rows) {
                for (var i = 0, len = role_rows.length; i < len; i++) {
                    articlelist += "\n<h2>" + role_rows[i].title + "</h2>";
                    articlelist += "\n<p><b><i>" + role_rows[i].updatetime  + "</i></b><br>" + role_rows[i].teaser + "</p>";
                }

                articlelist += "</div>";
                res.render('index.jade', {
                    user_name: session_data.user_name,
                    message: articlelist
                });

        }).catch(function(error) {
            console.log( '[list_articles] Error:' + error);

            res.render('index.jade', {
                user_name: session_data.user_name,
                message: error
            });

        });


    }
}
