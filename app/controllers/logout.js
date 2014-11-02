"use strict";

var app_config = require('../definitions/app_config.js');


module.exports = {
    'get_request': function (req, res) {
        console.log('[logout] get...');
        var flash_message_error = ""
        var flash_message = ""
        var session_data = req.session;
        session_data.user_name = "";
        session_data.rolls = {};

        res.render('logout.jade', {
            flash_message: flash_message,
            flash_message_error: flash_message_error,
            message: "Du bist abgemeldet"
        });
    }
}
