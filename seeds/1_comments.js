'use strict';

exports.seed = function(knex) {
  return knex('comments').del()
    .then(() => {
      return knex('comments').insert([{
        id: 1,
        username: 'courtneysanders',
        comment: 'yes i agree i also love climbing!'
      }, {
        id: 2,
        username: 'benson',
        content: 'I love treats!'
      }]);
    });
};
