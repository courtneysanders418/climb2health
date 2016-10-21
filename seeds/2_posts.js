'use strict';

exports.seed = function(knex) {
  return knex('posts').del()
    .then(() => {
      return knex('posts').insert([{
        user_id: 1,
        title: 'climbing',
        content: 'I love climbing!',
        image_url: 'http://68.media.tumblr.com/c6000b66aa395026c41f9f6c0e21c13b/tumblr_oeg1zrAFy71r2h77co1_1280.jpg'
      }, {
        user_id: 2,
        title: 'dog',
        content: 'I love treats!',
        image_url: 'http://67.media.tumblr.com/91c60214b8b80a817b3f645b344bbf81/tumblr_ocqedzZNeI1r2h77co1_1280.jpg'
      }]);
    });
};
