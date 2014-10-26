"use strict";

var AppConfig = function AppConfig(){};

/**
 * That's is the data base configuration
 */
AppConfig.prototype.db = {
    host: "localhost",
    port: "9999",
    filename: "./database.db",
    client: "sqlite3",
    debug: "true"
};


/**
 * acl matix for access controll.
 * The key is the url and the value the access roll.
 * For example:
 *
 * app.get( '/add', add_article.get_request ) ;
 * app.post( '/add', add_article.post_request );
 * app_config.souce_acl["/add"] = "admin";
 *
 * Only the user with the role "admin" can access.
 *
 *
 * app.get( '/login', login.get_request ) ;
 * app.post( '/login', login.post_request );
 * app_config.souce_acl["/login"] = "all";
 *
 * All user can access this site.
 */
AppConfig.prototype.souce_acl = {};

AppConfig.prototype.filename = "config-file.json"

var app_config = new AppConfig();
console.log('[app_config] filename ' + app_config.filename);
console.log('[app_config] host ' + app_config.db.host);

module.exports = app_config;


