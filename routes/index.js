'use strict'
var express = require('express');
var router = express.Router();
var knex = require('../knex');
var bcrypt = require('bcrypt')
    /* GET home page. */
router.get('/', function(req, res) {
    res.render('index', {
        title: 'Climb2health'
    });
});

// rendering/displaying the signup page once signup is clicked (signup.hbs)
router.get('/login', function(req, res) {
    res.render('login', {
        title: 'Climb2health'
    });
});

// rendering/displaying the signup page once signup is clicked (signup.hbs)
router.get('/signup', function(req, res) {
    res.render('signup', {
        title: 'Climb2health'
    });
});


// sending login info to the database
router.post('/login', function(req, res) {
    knex('users').where('email', req.body.email).then(function(results) {
        console.log(results);
        if (results.length == 0) {
            res.render('error', {
                message: 'email or password incorrect.'
            })
        } else {
            var user = results[0];
            var passwordMatch = bcrypt.compareSync(req.body.password, user.hashed_password)
            delete user.hashed_password;
            if (passwordMatch === false) {
                res.render('error', {
                    message: 'email or password incorrect.'
                })
            } else {
                req.session.userInfo = user
                res.redirect('/posts')
                console.log(user);
            }
        }
    })
})


// sending user info to the database
router.post('/signup', function(req, res) {
    console.log(req.body);
    knex('users')
        .insert({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            email: req.body.email,
            hashed_password: bcrypt.hashSync(req.body.password, 12)
        }, '*')
        .then(function(insertionData) {
            console.log('inserted data worked', insertionData);
            res.redirect('/posts')
        })
});


module.exports = router;
