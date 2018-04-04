var express = require('express');
var router = express.Router();
var Product = require('../models/product');

/* GET home page. */

router.get('/', function(req, res, next) {
    res.render('shop/main');
});

router.get('/about_us',(req,res,next) => {
  res.render('shop/about_us');
})

router.get('/hotels', function(req, res, next) {
  //db.products.find()
  Product.find( (err,docs)=>{
    var productChunks = [];
    for(var i = 0;i < docs.length ; i+=4){
      productChunks.push(docs.slice(i,i+4));
    }
    res.render('shop/index', {hotelrow : productChunks });
  });  
});


module.exports = router;
