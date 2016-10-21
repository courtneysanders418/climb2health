'use strict';

exports.seed = function(knex) {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([{
        username: 'courtneysanders',
        email: 'courtneysanders418@gmail.com',
        first_name: 'Courtney',
        last_name: 'Sanders',
        hashed_password: '$2a$12$nIWNWkn0l/33UVKGMeMpnehLvXnDwor7NtHXTm.AW3.sp2JHR30Ia'
      }, {
        username: 'benson',
        email: 'benson@gmail.com',
        first_name: 'benson',
        last_name: 'Sanders',
        hashed_password: 'h$2a$12$nIWNWkn0l/33UVKGMeMpnehLvXnDwor7NtHXTm.AW3.sp2JHR30Ia'
      }]);
    });
};
