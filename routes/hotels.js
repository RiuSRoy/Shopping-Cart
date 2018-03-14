var express = require('express');
const bodyParser = require('body-parser'); 
var hotelRouter = express.Router();
var Hotels = require('../models/product');
var Users = require('../models/user');
hotelRouter.use(bodyParser.json());


//code to empty the database Hotels
hotelRouter.delete('/',(req,res,next) => {
    Hotels.remove({})
    .then( (resp) => {
		res.statusCode = 200;
		res.setHeader('Content-Type','application/json');
		res.json(resp);
	} , (err) => next(err))
	.catch( (err) => next(err) );
})


hotelRouter.route('/:hotelId')
.get((req,res,next)=> {
    var hotelId = req.params.hotelId;
    Hotels.findById(hotelId)
    .then((hotel) => {
        if(hotel == null) {
            err = new Error('Hotel '+req.params.hotelId + ' not found!');
			err.status = 404;
			return next(err);
        }
        else if(req.isAuthenticated()) {
            var hasLiked = 0;
            if(hotel.likers.indexOf(req.user._id)!=-1)
                hasLiked = 1;
            res.render('hotels/hotel' , {hotel : hotel, userId : req.user._id ,hasLiked : hasLiked});
        }
        else {
            res.render('hotels/hotel' , {hotel : hotel});
        }
    } , (err) => next(err))
    .catch( (err) => next(err));
})
.post((req,res,next) => {
    var u_id = req.body.userApna || req.user._id;
    var hotelId = req.params.hotelId;
    Hotels.findById(hotelId)
    .then( (hotel) => {
        if(hotel == null) {
            err = new Error('Hotel '+hotelId + ' not found!');
			err.status = 404;
			return next(err);
        }
        else {
            var counter = hotel.reacts;
            if(counter == null || counter == NaN) {
                counter = 0;
            }
            var index = hotel.likers.indexOf(u_id);
            if(index == -1){ 
                hotel.likers.push(u_id); 
                ++counter;
                hotel.reacts = counter; 
                hotel.save() 
                .then( (hotel) => {
                    res.statusCode=200;
                    res.location('/hotels/'+hotelId);
                    res.redirect('/hotels/'+hotelId);
                    //res.json(hotel);
                },(err) => {
                    console.log(err);
                })  
                .catch ( (err) => {
                    console.log(err);
                });        
            }
            else {
                hotel.likers.splice(index , 1);
                --counter;
                hotel.reacts = counter;
                hotel.save() 
                .then( (hotel) => {
                    res.statusCode=200;
                    res.location('/hotels/'+hotelId);
                    res.redirect('/hotels/'+hotelId);
                    //res.json(hotel);
                },(err) => {
                    console.log(err);
                })  
                .catch ( (err) => {
                    console.log(err);
                }); 
            }
        }
    }, (err) => console.log(err))
    .catch((err) => console.log(err));
});



hotelRouter.route('/review/:hotelId')
.post((req,res,next) => {
    Users.findById(req.user._id)
    .then((user) => {
        if(user == null) {
            err = new Error('User '+req.user._id + ' not found!');
            err.status = 404;
            return next(err);
        }
        else {
            var temp = req.body.review;
            console.log(temp);
            var str = user.email;
            var result = str.split('@');
            Hotels.findById(req.params.hotelId)
            .then((hotel) => {
                if(hotel == null) {
                    err = new Error('Hotel '+hotelId + ' not found!');
                    err.status = 404;
                    return next(err);
                }
                else {
                    if(hotel.review.length==0) {
                        console.log("working");
                    }
                    hotel.review.push( {comment : temp,author : result[0]});
                    console.log(hotel.review);
                    hotel.save()
                    .then((hotel) => {
                        res.statusCode=200;
                        //res.json(hotel);
                        res.redirect('/hotels/'+hotel._id);
                    } ,(err) => {
                        console.log(err);
                    })  
                    .catch ( (err) => {
                        console.log(err);
                    }); 
                }
            },(err) => {
                console.log(err);
            })  
            .catch ( (err) => {
                console.log(err);
            }); 

            
        }
    } , (err ) => next(err))
    .catch((err) => console.log(err));    
});


hotelRouter.route('/book/:hotelId')
.get( (req,res,next) => {
    var hotelId = req.params.hotelId;
    Hotels.findById(hotelId)
    .then( (hotel) => {
        if(hotel == null) {
            err = new Error('Hotel '+req.params.hotelId + ' not found!');
			err.status = 404;
			return next(err);
        }
        else {
            var vacancy = 1;
            if(hotel.rooms == 0){
                vacancy = 0;
            }
            res.render( 'hotels/book' , {vacancy : vacancy , hotel : hotel, userId : req.user._id});
        }
    }, (err) => console.log(err))
    .catch((err) => console.log(err));
});
module.exports = hotelRouter;
