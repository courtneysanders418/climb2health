'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/', (_req, res, next) => {
    knex('posts')
        .orderBy('id')
        .then((posts) => {
            res.render('posts',{posts: posts});
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/:id', (req, res, next) => {
    knex('post')
        .where('id', req.params.id)
        .first()
        .then((post) => {
            if (!post) {
                return next();
            }

            res.send(post);
        })
        .catch((err) => {
            next(err);
        });
});

router.post('/', (req, res, next) => {
    knex('users')
        .where('id', req.body.artist_id)
        .first()
        .then((user) => {
            if (!user) {
                const err = new Error('username does not exist');

                err.status = 400;

                throw err;
            }

            return knex('posts')
                .insert({
                    username: req.body.username,
                    title: req.body.title,
                    content: req.body.content,
                    image_url: req.body.image_url
                }, '*');
        })
        .then((posts) => {
            res.send(posts[0]);
        })
        .catch((err) => {
            next(err);
        });
});

router.patch('/:id', (req, res, next) => {
    knex('posts')
        .where('id', req.params.id)
        .first()
        .then((post) => {
            if (!post) {
                return next();
            }

            return knex('users')
                .where('id', req.body.username)
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
                    username: req.body.username,
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
            res.send(post);
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;
