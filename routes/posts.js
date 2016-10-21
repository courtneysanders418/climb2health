'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/', (req, res, next) => {
    knex('posts')
        // .join('users', 'users.id', 'posts.user_id')
        .orderBy('posts.id')
        .then((posts) => {
          console.log('id', posts);
            res.render('posts', {
                posts: posts
            });
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/new', (req, res) => {
            res.render('new')
});


router.get('/:id', (req, res, next) => {
    knex('posts')
        .where('id', req.params.id)
        .first()
        .then((post) => {
            if (!post) {
                return next();
            }
            res.render('post', {
              post: post
            })
        })
        .catch((err) => {
            next(err);
        });
});


router.get('/:id/edit', (req, res, next) => {
    knex('posts')
        .where('id', req.params.id)
        .first()
        .then((post) => {
            if (!post) {
                return next();
            }
            res.render('edit', {
              post: post
            })
        })
        .catch((err) => {
            next(err);
        });
});



router.post('/', (req, res, next) => {
  console.log('posted to the blog');
    knex('posts')
        .insert({
            user_id: req.session.userInfo.id,
            title: req.body.title,
            content: req.body.content,
            image_url: req.body.image_url
        }, '*')
    .then((posts) => {
            res.redirect('/posts');
        })
        .catch((err) => {
            next(err);
        });
});

router.patch('/:id', (req, res, next) => {
  console.log(req.body);
    knex('posts')
        .where('id', req.params.id)
        .first()
        .then((post) => {
            if (!post) {
                return next();
            }
            return knex('users')
                .where('id', req.body.user_id)
                .first();
        })
        .then((user) => {
            if (!user) {
                const err = new Error('username does not exist');

                err.status = 400;

                throw err;
            }

            return knex('posts')
                .update({
                    title: req.body.title,
                    content: req.body.content,
                    image_url: req.body.image_url
                }, '*')
                .where('id', req.params.id);
        })
        .then((posts) => {
            res.send(posts[0]);
        })
        .catch((err) => {
            next(err);
        });
});

router.delete('/:id', (req, res, next) => {
    let post;

    knex('posts')
        .where('id', req.params.id)
        .first()
        .then((row) => {
            if (!row) {
                return next();
            }

            post = row;

            return knex('posts')
                .del()
                .where('id', req.params.id);
        })
        .then(() => {
            delete post.id;
            res.send('This item has been deleted');
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;
