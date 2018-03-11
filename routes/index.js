var express = require('express');
var router = express.Router();
var passport = require('passport');
var Product = require('../models/product');
//var csrf = require('csurf');
//var csrfProtection = csrf();
//router.use(csrfProtection); //all routers are protected by the csrf protection!

/* GET home page. */
router.get('/', function(req, res, next) {
  //db.products.find()
  Product.find( (err,docs)=>{
    var productChunks = [];
    for(var i = 0;i < docs.length ; i+=4){
      productChunks.push(docs.slice(i,i+4));
    }
    res.render('shop/index', { title: 'Shopping Cart',products : productChunks });
  });  
});

router.get('/user/signup',(req,res,next) => {
  var messages = req.flash('signupMessage');
  res.render('user/signup' , {messages : messages,hasErrors :messages.length > 0 });
});

router.post('/user/signup',passport.authenticate('local-signup' , {
  successRedirect: '/user/profile',
  failureRedirect : '/user/signup',
  failureFlash : true
}));

router.get('/user/profile',(req,res,next) => {
  res.render('user/profile');
});

router.get('/user/signin',(req,res,next)=>{
  var messages = req.flash('signinMessage');
  res.render('user/signin',{messages:messages,hasErrors:messages.length>0});
});

router.post('/user/signin',passport.authenticate('local-signin' , {
  successRedirect: '/user/profile',
  failureRedirect : '/user/signin',
  failureFlash : true
}));


module.exports = router;
