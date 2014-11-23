"use strict";

var g_user_name = "";
var g_session_data;
var g_req;
var g_res;
var g_flash_message_error = "";
var g_flash_message = "";
var g_db_salt = "";
var g_db_pw_hash = "";
var g_input_pw_hash = "";

var app_config = require('../definitions/app_config.js');
var crypto = require('crypto');
var knex = require('knex')({
    client: app_config.db.client,
    connection: {
        filename: app_config.db.filename
    }
});

function render_okay_page(role_rows) {

    for (var i = 0, len = role_rows.length; i < len; i++) {
        g_session_data.rolls[i] = role_rows[i].role_name;
    }
    g_res.render('login_okay.jade', {
        rolls: g_session_data.rolls,
        user_name: g_req.body.name
    });
}

function render_no_okay_page(error) {
                console.log( '[login] crash!' + error );
                g_flash_message_error = "Loginname oder Passwort falsch!";
                g_res.render('login.jade', {
                    flash_message: g_flash_message,
                    flash_message_error: g_flash_message_error,
                    csrfToken: g_req.csrfToken() ,
                    name: g_req.body.name
                });
}

function request_roles( id_rows ) {
    knex('user_role')
        .select('role_name')
        .where({ user_id: id_rows[0].id  })
        .debug()
        .then(render_okay_page);
}

function request_login_data( rows ) {
    console.log( '[login] salt: ' + rows[0].salt );
    console.log( '[login] pw_hash: ' + rows[0].pw_hash );
    g_db_salt = rows[0].salt;
    g_db_pw_hash = rows[0].pw_hash;

    console.log( '[login] db_salt: ' + g_db_salt );
    console.log( '[login] db_pw_hash: ' + g_db_pw_hash );
    g_input_pw_hash = crypto
        .createHash('sha1')
        .update( g_req.body.password + g_db_salt, 'utf8')
        .digest( 'hex');
    console.log('[login] input_pw_hash: ' + g_input_pw_hash );
    if ( g_input_pw_hash === g_db_pw_hash ) {
        g_flash_message = "Login erfolgreich!";
        console.log("Login erfolgreich!");
        g_session_data = g_req.session;
        g_session_data.user_name = g_req.body.name;
        g_session_data.rolls = [];
        user_id: knex('user')
            .select('id')
            .where({name: g_req.body.name})
            .debug()
            .then(request_roles);

    } else {
        console.log("Login falsch!");
        g_flash_message_error = "Loginname oder Passwort falsch!";

        g_res.render('login.jade', {
            flash_message: g_flash_message,
            flash_message_error: g_flash_message_error,
            csrfToken: g_req.csrfToken(),
            name: g_req.body.name
        });

    };
}

module.exports = {
    'get_request': function (req, res) {
        console.log('[login] get...');
        g_req = req;
        g_res = res;
        g_session_data = g_req.session;
        g_flash_message_error = "";
        g_flash_message = "";
        g_res.render('login.jade', {
            flash_message: g_flash_message,
            flash_message_error: g_flash_message_error,
            csrfToken: g_req.csrfToken()
        });
    },
    'post_request': function (req, res) {
        console.log('[login] post....');
        g_req = req;
        g_res = res;
        g_db_salt = "";
        g_db_pw_hash = "";
        g_input_pw_hash = "";
        g_flash_message_error = "";
        g_flash_message = "";
        g_user_name = g_req.body.name;

        console.log('[login] Name: ' + g_req.body.name);
        console.log('[login] Password: ' + g_req.body.password);


        knex('user')
            .select('salt','pw_hash')
            .where({name: g_req.body.name})
            .debug()
            .then( request_login_data ).catch( render_no_okay_page );
    }
}
