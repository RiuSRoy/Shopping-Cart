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
            price: '$45000',
            location : 'Nikita Complex, G S Road, Khanapara, Guwahati, Assam (781022)',
            likers : [],
            reacts : 0,
            phone : '0361 710 6710',
            rooms : 13

        }),
        new Product({
            imagePath:'https://images.pexels.com/photos/919/night-dark-hotel-luxury.jpg?h=350&auto=compress&cs=tinysrgb',
            title:'The Oberois',
            description:'A classy 5*! :O',
            price: '$50000',
            location: 'Dr. Zakir Hussain Marg, New Delhi, Delhi (110003)',
            likers : [],
            reacts : 0,
            phone : '011 2389 0606',
            rooms : 19
        }),
        new Product({
            imagePath:'https://images.pexels.com/photos/594077/pexels-photo-594077.jpeg?h=350&auto=compress&cs=tinysrgb',
            title:'Landmark',
            description:'The age old! :)',
            price: '$5000',
            location : '222 Marylebone Rd, Marylebone, London NW1 6JQ, UK',
            likers : [],
            reacts : 0,
            phone : '+44 20 7631 8000',
            rooms : 10
        }),
        new Product({
            imagePath:'https://images.pexels.com/photos/261429/pexels-photo-261429.jpeg?h=350&auto=compress&cs=tinysrgb',
            title:'The Leela',
            description:'5* beach hotel :D',
            price: '$75000',
            location : 'Mobor, Cavelossim, Salcette, Goa 403731',
            likers : [],
            reacts : 0,
            phone : '0832 662 1234',
            rooms : 15
        }),
        new Product({
            imagePath:'https://images.pexels.com/photos/169193/pexels-photo-169193.jpeg?h=350&auto=compress&cs=tinysrgb',
            title:'The Taj',
            description:"Defines luxury!",
            price: '$45000',
            location : 'Apollo Bandar, Colaba, Mumbai, Maharashtra 400001',
            likers : [],
            reacts : 0,
            phone : '022 6665 3366',
            rooms : 12
        }),
        new Product({
            imagePath:'https://images.pexels.com/photos/9376/groningen-the-netherlands.jpg?h=350&auto=compress&cs=tinysrgb',
            title:'Hyatt',
            description:"Lavishness!!",
            price: '$30000',
            location : 'JA-1 Sector III, Salt Lake City, Kolkata, West Bengal 700098',
            likers : [],
            reacts : 0,
            phone : '033 2335 1234',
            rooms : 17
        }),
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

