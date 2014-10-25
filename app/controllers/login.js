"use strict";

var app_config = require('../definitions/app_config.js');
var crypto = require('crypto');
var knex = require('knex')({
    client: app_config.db.client,
    connection: {
        filename: app_config.db.filename
    }
});


module.exports = {
    'get_request': function (req, res) {
        console.log('[login] get...');
        var flash_message_error = ""
        var flash_message = ""
        var session_data = req.session;
        res.render('login.jade', {
            flash_message: flash_message,
            flash_message_error: flash_message_error,
            csrfToken: req.csrfToken()
        });
    },
    'post_request': function (req, res) {
        console.log('[login] post....');
        var db_salt = "";
        var db_pw_hash = "";
        var input_pw_hash = "";
        var flash_message_error = ""
        var flash_message = ""

        console.log('[login] Name: ' + req.body.name);
        console.log('[login] Password: ' + req.body.password);


        knex('user')
            .select('salt','pw_hash')
            .where({name: req.body.name})
            .debug()
            .then( function(rows) {
                console.log( '[login] salt: ' + rows[0].salt );
                console.log( '[login] pw_hash: ' + rows[0].pw_hash );
                db_salt = rows[0].salt;
                db_pw_hash = rows[0].pw_hash;

                console.log( '[login] db_salt: ' + db_salt );
                console.log( '[login] db_pw_hash: ' + db_pw_hash );
                input_pw_hash = crypto
                    .createHash('sha1')
                    .update( req.body.password + db_salt, 'utf8')
                    .digest( 'hex');
                console.log('[login] input_pw_hash: ' + input_pw_hash );
                if ( input_pw_hash === db_pw_hash ) {
                    flash_message = "Login erfolgreich!";
                    console.log("Login erfolgreich!");
                    var session_data = req.session;
                    session_data.user_name = req.body.name;
                    res.redirect('/')

                } else {
                    console.log("Login falsch!");
                    flash_message_error = "Loginname oder Passwort falsch!";

                    res.render('login.jade', {
                        flash_message: flash_message,
                        flash_message_error: flash_message_error,
                        csrfToken: req.csrfToken(),
                        name: req.body.name
                    });

                };

            }).catch(function(error) {
                console.log( '[login] crash!' + error );
                flash_message_error = "Loginname oder Passwort falsch!";
                res.render('login.jade', {
                    flash_message: flash_message,
                    flash_message_error: flash_message_error,
                    csrfToken: req.csrfToken() ,
                    name: req.body.name

                });
            });


    }
}
