var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var csrf = require('csurf');
var csrfProtection = csrf();
router.use(csrfProtection); //all routers are protected by the csrf protection!

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
  res.render('user/signup',{csrfToken : req.csrfToken()});
});

router.post('/user/signup',(req,res,next)=>{
  res.redirect('/');
});

module.exports = router;
