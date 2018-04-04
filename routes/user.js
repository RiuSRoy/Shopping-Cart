var express = require('express');
var router = express.Router();
var passport = require('passport');
var Users = require('../models/user');
const bodyParser = require('body-parser'); 
router.use(bodyParser.json());
//var csrf = require('csurf');
//var csrfProtection = csrf();
//router.use(csrfProtection); //all routers are protected by the csrf protection!


router.delete('/' , (req,res,next) => {
    Users.remove({})
    .then( (resp) => {
		res.statusCode = 200;
		res.setHeader('Content-Type','application/json');
		res.json(resp);
	} , (err) => next(err))
	.catch( (err) => next(err) );
});

router.route('/profile',isLoggedIn)
.get((req,res,next) => {
    var userId = req.user._id;
    Users.findOne({_id: userId})
    .then((user)=>{
        var expiredBookings = [];
        var liveBookings = [];
        for(var i = 0;i<user.bookings.length; ++i) {
            if(user.bookings[i].endDate >= new Date()) {
                liveBookings.push(user.bookings[i]);
            }
            else {
                expiredBookings.push(user.bookings[i]);
            }
        }
        res.render('user/profile',{'user' : user , 'liveBookings' : liveBookings, 'expiredBookings' : expiredBookings});
    })
    .catch((err) => next(err));
});


router.get('/logout',isLoggedIn, (req,res,next) => {
    req.logout();
    res.redirect('/');
});

function isLoggedIn (req,res,next) {
    if(req.isAuthenticated()) {
        return next();     //continue
    } 
    else
        res.redirect('/'); 
}
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

router.use('/',notLoggedIn, (req,res,next) => {
    next();
});

router.get('/signup',(req,res,next) => {
  var messages = req.flash('signupMessage');
  res.render('user/signup' , {messages : messages,hasErrors :messages.length > 0 });
});

router.post('/signup',passport.authenticate('local-signup' , {
  successRedirect: '/user/profile',
  failureRedirect : '/user/signup',
  failureFlash : true
}));

router.get('/signin',(req,res,next)=>{
  var messages = req.flash('signinMessage');
  res.render('user/signin',{messages:messages,hasErrors:messages.length>0});
});

router.post('/signin', passport.authenticate('local-signin' , {
  successRedirect: '/hotels',
  failureRedirect : '/user/signin',
  failureFlash : true
}));



function notLoggedIn (req,res,next) {
    if(!req.isAuthenticated()) {
        return next();     //continue
    }
    else
        res.redirect('/'); 
}

module.exports = router;
