"use strict";

var AppConfig = function AppConfig(){};

AppConfig.prototype.db = {
    host: "localhost",
    port: "9999",
    filename: "./database.db",
    client: "sqlite3",
    debug: "true"
};

AppConfig.prototype.filename = "config-file.json"

var app_config = new AppConfig();
console.log('[app_config] filename ' + app_config.filename);
console.log('[app_config] host ' + app_config.db.host);

module.exports = app_config;


