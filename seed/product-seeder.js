var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var Product = require('../models/product');

mongoose.connect('mongodb://localhost:27017/shopping')
.then((db) => {
    console.log('Connected correctly to the server!');
    var products = [
        new Product({
            imagePath:'https://images.pexels.com/photos/441379/pexels-photo-441379.jpeg?w=940&h=650&auto=compress&cs=tinysrgb',
            title:'Vivanta',
            description:'By Taj! :P',
            price: '$45000'
        }),
        new Product({
            imagePath:'https://images.pexels.com/photos/919/night-dark-hotel-luxury.jpg?h=350&auto=compress&cs=tinysrgb',
            title:'The Oberois',
            description:'A classy 5*! :O',
            price: '$50000'
        }),
        new Product({
            imagePath:'https://images.pexels.com/photos/594077/pexels-photo-594077.jpeg?h=350&auto=compress&cs=tinysrgb',
            title:'Landmark',
            description:'The age old! :)',
            price: '$5000'
        }),
        new Product({
            imagePath:'https://images.pexels.com/photos/261429/pexels-photo-261429.jpeg?h=350&auto=compress&cs=tinysrgb',
            title:'Leelas',
            description:'7* resort :D',
            price: '$75000'
        }),
        new Product({
            imagePath:'https://images.pexels.com/photos/169193/pexels-photo-169193.jpeg?h=350&auto=compress&cs=tinysrgb',
            title:'The Taj',
            description:"The attack that shook all :'(",
            price: '$45000'
        })
    ];
    return products;
})
.then((products) => {
    var done = 0;
    for(var i = 0 ;i < products.length; ++i)
    {
        products[i].save()
        .then((product) => {
            console.log(product);
            return ++done;
        })
        .then((x)=>{
            if(x === products.length){
                mongoose.disconnect();
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }
})
.catch((err) => {
    console.log(err);
});

