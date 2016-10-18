'use strict';

exports.seed = function(knex) {
  return knex('posts').del()
    .then(() => {
      return knex('posts').insert([{
        id: 1,
        username: 'courtneysanders',
        email: 'courtneysanders418@gmail.com',
        first_name: 'Courtney',
        last_name: 'Sanders',
        hashed_password: 'hashed_password',
        created_at: '',
        updated_at: ''
      }, {
        username: 'benson',
        email: 'benson@gmail.com',
        first_name: 'benson',
        last_name: 'Sanders',
        hashed_password: 'hashed_password',
        created_at: '',
        updated_at: ''
      }]);
    });
};
