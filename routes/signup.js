var express = require('express');
//var popup = require('popups');
var passport = require('passport');
var DBManager = require('../controllers/DbManager');
var router = express.Router();



passport.serializeUser(function(user, done) {
  console.log("serializing " + user.username);
  done(null, user.username);
});

passport.deserializeUser(function(obj, done) {
  console.log("deserializing " + obj);
  done(null, obj);
});


router.get('/', function (req, res, next) {
    res.render('signup', { title: 'CV search signup' });
	});


router.post('/local-reg', passport.authenticate('local-signup', {

  successRedirect: '/search',
  failureRedirect: '/'
  }), function (req, res) {
    console.log("HEEEY");
    console.log(req.user);
    console.log(req.session);
    req.session.CV = req.user.CV;
    res.redirect('/search');
  }
);


module.exports = router;