var express = require('express');
var router = express.Router();
var Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
  //db.products.find()
  Product.find( (err,docs)=>{
    var productChunks = [];
    for(var i = 0;i < docs.length ; i+=4){
      productChunks.push(docs.slice(i,i+4));
    }
    var cnt = 5;
    res.render('shop/index', {hotelrow : productChunks , cnt : cnt});
  });  
});
module.exports = router;
