"use strict";

var app_config = require('../definitions/app_config.js');
var knex = require('knex')({
    client: app_config.db.client,
    connection: {
        filename: app_config.db.filename,
        debug: app_config.db.debug
    }
});
var crypto = require('crypto');

function randomValueHex (len) {
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,len);   // return required number of characters
}

var db_init = {
    check_exist: function(){
        console.log("check if database with tables exit...");

        knex.schema.hasTable('schema_version').then(function(exists) {
            if (!exists) {
                return knex.schema.createTable('schema_version', function(table) {
                  table.increments('id').primary();
                  table.integer('version_number').notNullable() ;
                  table.dateTime('update');
                }).debug() ;
            }
        });

        knex.schema.hasTable('article').then(function(exists) {
            if (!exists) {
                return knex.schema.createTable('article', function(table) {
                  table.increments('id').primary();
                  table.integer('version_number').notNullable();
                  table.dateTime('last_update');
                  table.text('title').notNullable() ;
                  table.text('teaser').defaultTo("no set") ;
                  table.text('body').defaultTo("no set") ;
                  table.text('state').defaultTo("Entwurff") ;
                }).debug();
            }
        });

        knex.schema.hasTable('artikle_tag').then(function(exists) {
            if (!exists) {
                return knex.schema.createTable('artikle_tag', function(table) {
                  table.increments('id').primary();
                  table.integer('artikle_id').notNullable();
                  table.text('tag_name').defaultTo("no set") ;
                }).debug();
            }
        });

        knex.schema.hasTable('user').then(function(exists) {
            if (!exists) {
                return knex.schema.createTable('user', function(table) {
                  table.increments('id').primary();
                  table.integer('email').notNullable();
                  table.text('name').unique()  ;
                  table.text('salt').notNullable() ;
                  table.text('pw_hash').notNullable() ;
                }).debug();
            }
        });

        knex.schema.hasTable('user_role').then(function(exists) {
            if (!exists) {
                return knex.schema.createTable('user_role', function(table) {
                  table.increments('id').primary();
                  table.integer('user_id').notNullable();
                  table.text('role_name').notNullable() ;
                }).debug();
            }
        });

        knex.schema.hasTable('rss_feeds').then(function(exists) {
            if (!exists) {
                return knex.schema.createTable('rss_feeds', function(table) {
                  table.increments('id').primary();
                  table.text('title').notNullable();
                  table.text('linkurl').notNullable();
                  table.text('description').notNullable();
                  table.dateTime('createtime');
                }).debug();
            }
        });

        knex('schema_version')
            .select('version_number')
            .debug()
            .then( function(rows) {
                console.log( '[db_init] Version of database schema : ' + rows[0].version_number );
            }).catch(function(error) {
                console.log( '[db_init] No found version number of database schema. Create admin user.');

                // if this select not found any versions number, than schema
                // is new create an a first user is needed.

                var pw_salt = randomValueHex (16);
                var pw_hash = crypto
                    .createHash('sha1')
                    .update( 'oblog' + pw_salt, 'utf8')
                    .digest( 'hex');

                knex('user')
                    .insert( {
                        email: 'set@you-address.now',
                        name: 'oblog',
                        salt: pw_salt,
                        pw_hash: pw_hash
                    })
                    .debug()
                    .then(function(inserts) {
                        console.log('[db_init] ' + inserts.length + ' new version saved.');
                        user_id: knex('user')
                            .select('id')
                            .where({name: 'oblog'})
                            .debug()
                            .then( function(id_rows) {

                                 knex('user_role')
                                    .insert( {
                                        user_id: id_rows[0].id,
                                        role_name: 'admin'
                                    })
                                    .debug()
                                    .then(function(inserts) {
                                        console.log('[db_init] ' + inserts.length + ' new version saved.');
                                    });
                                 knex('user_role')
                                    .insert( {
                                        user_id: id_rows[0].id,
                                        role_name: 'anonymous'
                                    })
                                    .debug()
                                    .then(function(inserts) {
                                        console.log('[db_init] ' + inserts.length + ' new version saved.');
                                    });
                            });
                    });


                console.log( '[db_init] Set version number of database schema and reate admin user.');
                knex('schema_version')
                    .insert( {version_number: 1, update: Date.now()} )
                    .debug()
                    .then(function(inserts) {
                        console.log('[db_init] ' + inserts.length + ' new version saved.');
                    });
            });

    },
    check_update: function(){
        console.log("check if exist a database tables update...");


    }
};



module.exports = db_init;
