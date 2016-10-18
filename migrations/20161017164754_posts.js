'use strict';

exports.up = function(knex) {
    return knex.schema.createTable('posts', (table) => {
        table.increments();
        table.string('username').notNullable().defaultTo('');
        table.string('title').notNullable().defaultTo('');
        table.text('content').notNullable().defaultTo('');
        table.text('image_url').notNullable().defaultTo('');
        table.timestamps(true, true);
    })

};

exports.down = function(knex) {
    return knex.schema.dropTable('posts');
};
