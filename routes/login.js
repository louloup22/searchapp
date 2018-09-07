var express = require('express');
//var popup = require('popups');
var passport = require('passport');
var router = express.Router();


router.get('/', function (req, res, next) {
		//res.render('login', { flash: req.flash() } );
    res.render('login', { title: 'CV search login' });
	});


//sends the request through our local login/signin strategy, and if successful takes user to catalogue page, otherwise returns then to signin page
router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/search',
  failureRedirect: '/login'
  }), function (req, res) {
    req.session.CV = req.user.CV;
    res.redirect('/search');
  }
);



module.exports = router;