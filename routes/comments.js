'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/', (_req, res, next) => {
    knex('comments')
        .orderBy('id')
        .then((comments) => {
            res.send(comments);
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/:id', (req, res, next) => {
    knex('comments')
        .where('id', req.params.id)
        .first()
        .then((comment) => {
            if (!comment) {
                return next();
            }

            res.send(comment);
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

            return knex('comments')
                .insert({
                    username: req.body.username,
                    comment: req.body.comment
                }, '*');
        })
        .then((comments) => {
            res.send(comments[0]);
        })
        .catch((err) => {
            next(err);
        });
});

router.patch('/:id', (req, res, next) => {
    knex('comments')
        .where('id', req.params.id)
        .first()
        .then((comment) => {
            if (!comment) {
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

            return knex('comments')
                .update({
                    username: req.body.username,
                    comment: req.body.commment
                }, '*')
                .where('id', req.params.id);
        })
        .then((comments) => {
            res.send(comments[0]);
        })
        .catch((err) => {
            next(err);
        });
});

router.delete('/:id', (req, res, next) => {
    let comment;

    knex('comments')
        .where('id', req.params.id)
        .first()
        .then((row) => {
            if (!row) {
                return next();
            }

            comment = row;

            return knex('comments')
                .del()
                .where('id', req.params.id);
        })
        .then(() => {
            delete comment.id;
            res.send(comment);
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;
