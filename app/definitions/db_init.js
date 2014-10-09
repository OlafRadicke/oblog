"use strict";
var app_config = require('../definitions/app_config.js');

var knex = require('knex')({
    client: app_config.db.client,
    connection: {
        filename: app_config.db.filename,
        debug: app_config.db.debug
    }
});

var db_init = {
    check_exist: function(){
        console.log("check if database with tables exit...");

        knex.schema.hasTable('schema_version').then(function(exists) {
            if (!exists) {
                return knex.schema.createTable('schema_version', function(table) {
                  table.increments('id').primary();
                  table.integer('version_number').notNullable() ;
//                   table.dateTime('update').defaultTo(knex.raw("date('now')"));
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
                  table.text('name').defaultTo("") ;
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

        knex('schema_version').insert( [{version_number: 1}] ).debug();
    },
    check_update: function(){
        console.log("check if exist a database tables update...");


    }
};



module.exports = db_init;
