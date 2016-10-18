'use strict'
var express = require('express');
var router = express.Router();
var knex = require('../knex');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Climb2health' });
});

// rendering/displaying the signup page once signup is clicked (signup.hbs)
router.get('/signup', function(req, res) {
  res.render('signup', { title: 'Climb2health' });
});

// sending user info to the database
router.post('/signup', function(req, res){
  console.log(req.body);
  knex('users')
    .insert({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      email: req.body.email,
      hashed_password: req.body.password
    }, '*')
    .then(function(insertionData) {
      console.log('inserted data worked', insertionData);
      res.redirect('/posts')
    })
});

module.exports = router;
