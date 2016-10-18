'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');

router.get('/', (_req, res, next) => {
    knex('users')
        .orderBy('id')
        .then((users) => {
            res.send(users);
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/:id', (req, res, next) => {
    knex('users')
        .where('id', req.params.id)
        .first()
        .then((user) => {
            if (!user) {
                return next();
            }

            res.send(user);
        })
        .catch((err) => {
            next(err);
        });
});

router.post('/', (req, res, next) => {
    bcrypt.hash(req.body.password, 12)
        .then((hashed_password) => {
            return knex('users')
                .insert({
                    email: req.body.email,
                    hashed_password: hashed_password
                }, '*');
        })
        .then((users) => {
            const user = users[0];
            delete user.hashed_password;
            res.send(user);
        })
        .catch((err) => {
            next(err);
        });
});

router.patch('/:id', (req, res, next) => {
    knex('users')
        .where('id', req.params.id)
        .first()
        .then((user) => {
            if (!user) {
                return next();
            }

            return knex('users')
                .update({
                    name: req.body.name
                }, '*')
                .where('id', req.params.id);
        })
        .then((users) => {
            res.send(users[0]);
        })
        .catch((err) => {
            next(err);
        });
});

router.delete('/:id', (req, res, next) => {
    let user;

    knex('users')
        .where('id', req.params.id)
        .first()
        .then((row) => {
            if (!row) {
                return next();
            }

            user = row;

            return knex('user')
                .del()
                .where('id', req.params.id);
        })
        .then(() => {
            delete user.id;
            res.send(user);
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/:id/posts', (req, res, next) => {
    knex('posts')
        .where('user_id', req.params.id)
        .orderBy('id')
        .then((post) => {
            res.send(post);
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;
