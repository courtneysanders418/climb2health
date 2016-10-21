'use strict';

exports.seed = function(knex) {
  return knex('comments').del()
    .then(() => {
      return knex('comments').insert([{
        username: 'courtneysanders',
        comment: 'yes i agree i also love climbing!'
      }, {
        username: 'benson',
        comment: 'I love treats!'
      }]);
    });
};
