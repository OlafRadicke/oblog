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
        console.log('edit user account');
        var flash_message_error = ""
        var flash_message = ""

        knex('user')
            .select('email')
            .where('name', req.body.name)
            .debug()
            .then( function(rows) {

                res.render('edit_account.jade', {
                    flash_message: flash_message,
                    flash_message_error: flash_message_error,
                    csrfToken: req.csrfToken(),
                    email: rows[0].email
                });

            })
            .catch(function(error) {
                res.render('error.jade', {
                    flash_message_error:  error
                });
            });



    },
    'post_request': function (req, res) {
        console.log('edit account');
        var flash_message_error = ""
        var flash_message = ""
        var salt;

        console.log('[edit_account] DB-Host ' +  app_config.db.host);
        console.log('[edit_account] filename' + app_config.filename);

        console.log('[edit_account] name: ' + req.body.name);
        console.log('[edit_account] email: ' + req.body.email);
        console.log('[edit_account] passwort: ' + req.body.password);

        knex('user')
            .select('salt')
            .where('name', req.body.name)
            .debug()
            .then( function(rows) {
                console.log( '[db_init] The database schema version is: ' + rows[0].salt );
                var pw_salt = rows[0].salt;


                var pw_hash = crypto
                    .createHash('sha1')
                    .update( req.body.password + pw_salt, 'utf8')
                    .digest( 'hex');
                console.log('[edit_account] pw_hash: ' + pw_hash );

                knex('user')
                    .where('name', '=', req.body.name)
                    .update({
                        email: req.body.email,
                        pw_hash: pw_hash
                     })
                    .then( function(rows) {
                        flash_message = "Änderungen wurden gespeichert";
                        res.render('edit_account.jade', {
                            flash_message: flash_message,
                            flash_message_error: flash_message_error,
                            csrfToken: req.csrfToken(),
                            email: req.body.email
                        });

                    })
                    .catch(function(error) {
                        res.redirect('/error/' + error)
                    });

            })
            .catch(function(error) {
                res.redirect('/error/' + error)
            });

    }
}
