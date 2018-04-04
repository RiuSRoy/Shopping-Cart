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
            price: '$250',
            location : 'Nikita Complex, G S Road, Khanapara, Guwahati, Assam (781022)',
            likers : [],
            reacts : 0,
            phone : '0361 710 6710',
            rooms : {
                stnSGLac : {
                    rooms_left : 10,
                    fare : "$300"
                },
                stnSGLno : {
                    rooms_left : 15,
                    fare : "$250"
                },
                stnDBLac : {
                    rooms_left : 10,
                    fare : "$450"
                },
                stnDBLno : {
                    rooms_left : 15,
                    fare : "$350"
                },
                stnTPLac : {
                    rooms_left : 12,
                    fare : "$500"
                },
                stnTPLno : {
                    rooms_left : 15,
                    fare : "$400"
                },
                delSGL :   {
                    rooms_left : 20,
                    fare : "$550"
                },
                delDBL :   {
                    rooms_left : 18,
                    fare : "$650"
                },
                delfam :   {
                    rooms_left : 25,
                    fare : "$750"
                },
                preSut :   {
                    rooms_left : 8,
                    fare : "$1000"
                },
                execSut :  {
                    rooms_left : 9,
                    fare : "$950"
                },
                honSut :   {
                    rooms_left : 5,
                    fare : "$850"
                },
            }

        }),
        new Product({
            imagePath:'https://images.pexels.com/photos/919/night-dark-hotel-luxury.jpg?h=350&auto=compress&cs=tinysrgb',
            title:'The Oberois',
            description:'A classy 5*! :O',
            price: '$300',
            location: 'Dr. Zakir Hussain Marg, New Delhi, Delhi (110003)',
            likers : [],
            reacts : 0,
            phone : '011 2389 0606',
            rooms : {
                stnSGLac : {
                    rooms_left : 15,
                    fare : "$350"
                },
                stnSGLno : {
                    rooms_left : 15,
                    fare : "$300"
                },
                stnDBLac : {
                    rooms_left : 15,
                    fare : "$450"
                },
                stnDBLno : {
                    rooms_left : 15,
                    fare : "$400"
                },
                stnTPLac : {
                    rooms_left : 15,
                    fare : "$550"
                },
                stnTPLno : {
                    rooms_left : 15,
                    fare : "$500"
                },
                delSGL :   {
                    rooms_left : 15,
                    fare : "$520"
                },
                delDBL :   {
                    rooms_left : 15,
                    fare : "$620"
                },
                delfam :   {
                    rooms_left : 15,
                    fare : "$680"
                },
                preSut :   {
                    rooms_left : 15,
                    fare : "$750"
                },
                execSut :  {
                    rooms_left : 15,
                    fare : "$750"
                },
                honSut :   {
                    rooms_left : 15,
                    fare : "$700"
                }
            }
        }),
        new Product({
            imagePath:'https://images.pexels.com/photos/594077/pexels-photo-594077.jpeg?h=350&auto=compress&cs=tinysrgb',
            title:'Landmark',
            description:'The age old! :)',
            price: '$500',
            location : '222 Marylebone Rd, Marylebone, London NW1 6JQ, UK',
            likers : [],
            reacts : 0,
            phone : '+44 20 7631 8000',
            rooms : {
                stnSGLac : {
                    rooms_left : 12,
                    fare : "$550"
                },
                stnSGLno : {
                    rooms_left : 14,
                    fare : "$500"
                },
                stnDBLac : {
                    rooms_left : 19,
                    fare : "$650"
                },
                stnDBLno : {
                    rooms_left : 16,
                    fare : "$600"
                },
                stnTPLac : {
                    rooms_left : 22,
                    fare : "$750"
                },
                stnTPLno : {
                    rooms_left : 10,
                    fare : "$700"
                },
                delSGL :   {
                    rooms_left : 12,
                    fare : "$720"
                },
                delDBL :   {
                    rooms_left : 18,
                    fare : "$820"
                },
                delfam :   {
                    rooms_left : 25,
                    fare : "$680"
                },
                preSut :   {
                    rooms_left : 10,
                    fare : "$980"
                },
                execSut :  {
                    rooms_left : 30,
                    fare : "$950"
                },
                honSut :   {
                    rooms_left : 7,
                    fare : "$900"
                }
            }
        }),
        new Product({
            imagePath:'https://images.pexels.com/photos/261429/pexels-photo-261429.jpeg?h=350&auto=compress&cs=tinysrgb',
            title:'The Leela',
            description:'5* beach hotel :D',
            price: '$750',
            location : 'Mobor, Cavelossim, Salcette, Goa 403731',
            likers : [],
            reacts : 0,
            phone : '0832 662 1234',
            rooms : {
                stnSGLac : {
                    rooms_left : 18,
                    fare : "$750"
                },
                stnSGLno : {
                    rooms_left : 16,
                    fare : "$700"
                },
                stnDBLac : {
                    rooms_left : 18,
                    fare : "$850"
                },
                stnDBLno : {
                    rooms_left : 16,
                    fare : "$400"
                },
                stnTPLac : {
                    rooms_left : 18,
                    fare : "$550"
                },
                stnTPLno : {
                    rooms_left : 16,
                    fare : "$500"
                },
                delSGL :   {
                    rooms_left : 12,
                    fare : "$520"
                },
                delDBL :   {
                    rooms_left : 15,
                    fare : "$620"
                },
                delfam :   {
                    rooms_left : 18,
                    fare : "$680"
                },
                preSut :   {
                    rooms_left : 28,
                    fare : "$750"
                },
                execSut :  {
                    rooms_left : 8,
                    fare : "$750"
                },
                honSut :   {
                    rooms_left : 6,
                    fare : "$700"
                }
            }
        }),
        new Product({
            imagePath:'https://images.pexels.com/photos/169193/pexels-photo-169193.jpeg?h=350&auto=compress&cs=tinysrgb',
            title:'The Taj',
            description:"Defines luxury!",
            price: '$650',
            location : 'Apollo Bandar, Colaba, Mumbai, Maharashtra 400001',
            likers : [],
            reacts : 0,
            phone : '022 6665 3366',
            rooms : {
                stnSGLac : {
                    rooms_left : 15,
                    fare : "$680"
                },
                stnSGLno : {
                    rooms_left : 8,
                    fare : "$650"
                },
                stnDBLac : {
                    rooms_left : 8,
                    fare : "$820"
                },
                stnDBLno : {
                    rooms_left : 8,
                    fare : "$750"
                },
                stnTPLac : {
                    rooms_left : 8,
                    fare : "$1000"
                },
                stnTPLno : {
                    rooms_left : 8,
                    fare : "$950"
                },
                delSGL :   {
                    rooms_left : 8,
                    fare : "$1200"
                },
                delDBL :   {
                    rooms_left : 8,
                    fare : "$1500"
                },
                delfam :   {
                    rooms_left : 8,
                    fare : "$1800"
                },
                preSut :   {
                    rooms_left : 8,
                    fare : "$2400"
                },
                execSut :  {
                    rooms_left : 8,
                    fare : "$2800"
                },
                honSut :   {
                    rooms_left : 8,
                    fare : "$2000"
                }
            }
        }),
        new Product({
            imagePath:'https://images.pexels.com/photos/9376/groningen-the-netherlands.jpg?h=350&auto=compress&cs=tinysrgb',
            title:'Hyatt',
            description:"Lavishness!!",
            price: '$300',
            location : 'JA-1 Sector III, Salt Lake City, Kolkata, West Bengal 700098',
            likers : [],
            reacts : 0,
            phone : '033 2335 1234',
            rooms : {
                stnSGLac : {
                    rooms_left : 13,
                    fare : "$350"
                },
                stnSGLno : {
                    rooms_left : 13,
                    fare : "$300"
                },
                stnDBLac : {
                    rooms_left : 13,
                    fare : "$450"
                },
                stnDBLno : {
                    rooms_left : 13,
                    fare : "$400"
                },
                stnTPLac : {
                    rooms_left : 13,
                    fare : "$550"
                },
                stnTPLno : {
                    rooms_left : 13,
                    fare : "$500"
                },
                delSGL :   {
                    rooms_left : 13,
                    fare : "$740"
                },
                delDBL :   {
                    rooms_left : 13,
                    fare : "$880"
                },
                delfam :   {
                    rooms_left : 13,
                    fare : "$960"
                },
                preSut :   {
                    rooms_left : 13,
                    fare : "$1100"
                },
                execSut :  {
                    rooms_left : 13,
                    fare : "$12000"
                },
                honSut :   {
                    rooms_left : 13,
                    fare : "$1000"
                }
            }
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

