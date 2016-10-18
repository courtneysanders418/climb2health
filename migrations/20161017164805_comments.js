'use strict';

exports.up = function(knex) {
    return knex.schema.createTable('comments', (table) => {
        table.increments();
        table.string('username').notNullable().defaultTo('');
        table.text('comment').notNullable().defaultTo('');
        table.timestamps(true, true);
    })

};

exports.down = function(knex) {
    return knex.schema.dropTable('comments');
};
