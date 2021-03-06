'use strict';

exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments();
        table.string('first_name').notNullable().defaultTo('')
        table.string('last_name').notNullable().defaultTo('')
        table.string('username').notNullable().defaultTo('');
        table.string('email').unique().notNullable();
        table.text('hashed_password').notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
