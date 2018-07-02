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




router.get('/hotels/page/:pageNo', function(req, res, next) {
  
  var pageNo = parseInt(req.params.pageNo);
  var size = 4;
  var query = {};
  if(pageNo < 0 || pageNo === 0) {
    response = {
      "error" : true,
      "message" : "invalid page number, should start with 1"
    };
    return res.json(response)
  }
  query.skip = size * (pageNo - 1) ; 
  query.limit = size ;
  Product.count({} , (err , totalCount) => {
    if(err) {
      response = {
        "error" : true,
        "message" : "Error fetching data!"
      };
      res.json(response);
    }
    else {
      Product.find( {} , {} , query ,  (err,docs)=>{
        var productChunks = [] , page = [];
        for(var i = 0;i < docs.length ; i+=2){
          productChunks.push(docs.slice(i,i+2));
        }
        var totalPages = Math.ceil(totalCount / size);
        for(var i = 0; i < totalPages ; ++i) {
          page.push(i+1);
        }
        res.render('shop/index', {hotelrow : productChunks , pages : page });
      });  
    }
  });
  
});


module.exports = router;
