var express = require('express');
var router = express.Router();
var passport = require('passport');
//var csrf = require('csurf');
//var csrfProtection = csrf();
//router.use(csrfProtection); //all routers are protected by the csrf protection!

router.get('/profile',isLoggedIn,(req,res,next) => {
    res.render('user/profile');
  });


router.get('/logout',isLoggedIn, (req,res,next) => {
    req.logout();
    res.redirect('/');
})

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
  successRedirect: '/',
  failureRedirect : '/user/signin',
  failureFlash : true
}));


function isLoggedIn (req,res,next) {
    if(req.isAuthenticated()) {
        return next();     //continue
    } 
    else
        res.redirect('/'); 
}

function notLoggedIn (req,res,next) {
    if(!req.isAuthenticated()) {
        return next();     //continue
    }
    else
        res.redirect('/'); 
}

module.exports = router;
