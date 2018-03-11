var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var Product = require('../models/product');

mongoose.connect('mongodb://localhost:27017/shopping')
.then((db) => {
    console.log('Connected correctly to the server!');
    var products = [
        new Product({
            imagePath:'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
            title:'Vivanta',
            description:'By Taj! :P',
            price: 45000
        }),
        new Product({
            imagePath:'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
            title:'The Oberois',
            description:'A classy 5*! :O',
            price: 50000
        }),
        new Product({
            imagePath:'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
            title:'Landmark',
            description:'The age old! :)',
            price: 5000
        }),
        new Product({
            imagePath:'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
            title:'Leelas',
            description:'7* resort :D',
            price: 75000
        }),
        new Product({
            imagePath:'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
            title:'The Taj',
            description:"The attack that shook all :'(",
            price: 45000
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

