var express = require('express');
const bodyParser = require('body-parser'); 
var hotelRouter = express.Router();
var Hotels = require('../models/product');
var Users = require('../models/user');
hotelRouter.use(bodyParser.json());


//code to empty the database products
hotelRouter.delete('/',(req,res,next) => {
    Hotels.remove({})
    .then( (resp) => {
		res.statusCode = 200;
		res.setHeader('Content-Type','application/json');
		res.json(resp);
	} , (err) => next(err))
	.catch( (err) => next(err) );
});


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
                Users.findById( u_id)
                .then( (user) => {
                    if(user == null) {
                        err = new Error('User '+u_id + ' not found!');
                        err.status = 404;
                        return next(err);
                    }
                    else {
                        user.wishlist.push(hotel.title);
                        hotel.likers.push(u_id);                 
                        ++counter;
                        hotel.reacts = counter; 
                        hotel.save() 
                        .then( (hotel) => {
                            user.save()
                            .then( (user) => {
                                res.statusCode=200;
                                res.location('/hotels/'+hotelId);
                                res.redirect('/hotels/'+hotelId);
                                //res.json(hotel);
                            },(err) => console.log(err))
                            .catch( (err) => console.log(err));                            
                        },(err) => {
                            console.log(err);
                        })  
                        .catch ( (err) => {
                            console.log(err);
                        }); 
                    } 
                } , (err) => console.log(err))
                .catch( (err) => console.log(err));                      
            }
            else {
                hotel.likers.splice(index , 1);
                --counter;
                hotel.reacts = counter;
                hotel.save() 
                .then( (hotel) => {
                    Users.findById( u_id)
                    .then( (user) => {
                        if(user == null) {
                            err = new Error('User '+u_id + ' not found!');
                            err.status = 404;
                            return next(err);
                        }
                        else {
                            var idx = user.bookings.indexOf(hotel.title);
                            user.wishlist.splice(idx , 1);
                            user.save()
                            .then( (user) => {
                                res.statusCode=200;
                                res.location('/hotels/'+hotelId);
                                res.redirect('/hotels/'+hotelId);
                                //res.json(hotel);
                            } ,(err) => console.log(err))
                            .catch((err) => console.log(err));
                        }
                    } , (err) => console.log(err))
                    .catch( (err) =>console.log(err));                  
                    
                },(err) => console.log(err))  
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
                    hotel.review.push( {comment : temp,author : result[0]});
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


hotelRouter.route('/book/:hotelId',isLoggedIn)
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
            for(var i = 0;i < hotel.bookings.length ; ++i) {
                if(hotel.bookings[i].endDate < new Date()) {
                    if(hotel.bookings[i].roomType == 's1') {
                        counter = hotel.rooms.stnSGLac.rooms_left;
                        if(counter == null || counter == NaN) {
                            counter = 0;
                        }
                        counter += hotel.bookings[i].no_of_rooms;
                        hotel.rooms.stnSGLac.rooms_left = counter;
                    }
                    else if(hotel.bookings[i].roomType == 's1n') {
                        counter = hotel.rooms.stnSGLno.rooms_left;
                        if(counter == null || counter == NaN) {
                            counter = 0;
                        }
                        counter += hotel.bookings[i].no_of_rooms;
                        hotel.rooms.stnSGLno.rooms_left = counter;
                    }
                    else if(hotel.bookings[i].roomType == 's2') {
                        counter = hotel.rooms.stnDBLac.rooms_left;
                        if(counter == null || counter == NaN) {
                            counter = 0;
                        }
                        counter += hotel.bookings[i].no_of_rooms;
                        hotel.rooms.stnDBLac.rooms_left = counter;
                    }
                    else if(hotel.bookings[i].roomType == 's2n') {
                        counter = hotel.rooms.stnDBLno.rooms_left;
                        if(counter == null || counter == NaN) {
                            counter = 0;
                        }
                        counter += hotel.bookings[i].no_of_rooms;
                        hotel.rooms.stnDBLno.rooms_left = counter;
                    }
                    else if(hotel.bookings[i].roomType == 's3') {
                        counter = hotel.rooms.stnTPLac.rooms_left;
                        if(counter == null || counter == NaN) {
                            counter = 0;
                        }
                        counter += hotel.bookings[i].no_of_rooms;
                        hotel.rooms.stnTPLac.rooms_left = counter;
                    }
                    else if(hotel.bookings[i].roomType == 's3n') {
                        counter = hotel.rooms.stnTPLno.rooms_left;
                        if(counter == null || counter == NaN) {
                            counter = 0;
                        }
                        counter += hotel.bookings[i].no_of_rooms;
                        hotel.rooms.stnTPLno.rooms_left = counter;
                    }
                    else if(hotel.bookings[i].roomType == 'd1') {
                        counter = hotel.rooms.delSGL.rooms_left;
                        if(counter == null || counter == NaN) {
                            counter = 0;
                        }
                        counter += hotel.bookings[i].no_of_rooms;
                        hotel.rooms.delSGL.rooms_left = counter;
                    }
                    else if(hotel.bookings[i].roomType == 'd2') {
                        counter = hotel.rooms.delDBL.rooms_left;
                        if(counter == null || counter == NaN) {
                            counter = 0;
                        }
                        counter += hotel.bookings[i].no_of_rooms;
                        hotel.rooms.delDBL.rooms_left = counter;
                    }
                    else if(hotel.bookings[i].roomType == 'd3') {
                        counter = hotel.rooms.delfam.rooms_left;
                        if(counter == null || counter == NaN) {
                            counter = 0;
                        }
                        counter += hotel.bookings[i].no_of_rooms;
                        hotel.rooms.delfam.rooms_left = counter;
                    }
                    else if(hotel.bookings[i].roomType == 'p') {
                        counter = hotel.rooms.preSut.rooms_left;
                        if(counter == null || counter == NaN) {
                            counter = 0;
                        }
                        counter += hotel.bookings[i].no_of_rooms;
                        hotel.rooms.preSut.rooms_left = counter;
                    }
                    else if(hotel.bookings[i].roomType == 'e') {
                        counter = hotel.rooms.preSut.rooms_left;
                        if(counter == null || counter == NaN) {
                            counter = 0;
                        }
                        counter += hotel.bookings[i].no_of_rooms;
                    }
                    else if(hotel.bookings[i].roomType == 'h') {
                        counter = hotel.rooms.honSut.rooms_left;
                        if(counter == null || counter == NaN) {
                            counter = 0;
                        }
                        counter += hotel.bookings[i].no_of_rooms;
                        hotel.rooms.honSut.rooms_left = counter;
                    }
                    hotel.bookings.splice(i , 1);
                }
            }
            hotel.save()
            .then((hotel) => {
                res.render( 'hotels/book' , {hotel : hotel, userId : req.user._id});
            } , (err)=>console.log(err))
            .catch( (err) => console.log(err));
        }
    }, (err) => console.log(err))
    .catch((err) => console.log(err));
})
.post( (req,res,next) => {
    var name = req.body.name;
    var roomType = req.body.room_id;
    var no_of_rooms = req.body.no_of_rooms;
    var beginDate = req.body.beginDate;
    var endDate = req.body.endDate;
    var phone = req.body.phone;
    var email = req.body.email;
    Users.findById(req.user._id)
    .then((user) => {
        if(user == null) {
            err = new Error('User '+req.user._id + ' not found!');
            err.status = 404;
            return next(err);
        }
        else {
            Hotels.findById(req.params.hotelId)
            .then( (hotel) => {
                if(hotel == null) {
                    err = new Error('Hotel '+hotelId + ' not found!');
                    err.status = 404;
                    return next(err);
                }
                else {
                    if(roomType == "s1") {
                        counter = hotel.rooms.stnSGLac.rooms_left;
                        if(counter == null || counter == NaN) {
                            counter = 0;
                        }
                        counter -= no_of_rooms;
                        hotel.rooms.stnSGLac.rooms_left = counter;
                        console.log(counter);
                    }
                    else if(roomType == "s1n") {
                        counter = hotel.rooms.stnSGLno.rooms_left;
                        if(counter == null || counter == NaN) {
                            counter = 0;
                        }
                        counter -= no_of_rooms;
                        hotel.rooms.stnSGLno.rooms_left = counter;
                        console.log(counter);
                    }
                    else if(roomType == "s2") {
                        counter = hotel.rooms.stnDBLac.rooms_left;
                        if(counter == null || counter == NaN) {
                            counter = 0;
                        }
                        counter -= no_of_rooms;
                        hotel.rooms.stnDBLac.rooms_left = counter;
                        console.log(counter);
                    }
                    else if(roomType == "s2n") {
                        counter = hotel.rooms.stnDBLno.rooms_left;
                        if(counter == null || counter == NaN) {
                            counter = 0;
                        }
                        counter -= no_of_rooms;
                        hotel.rooms.stnDBLno.rooms_left = counter;
                        console.log(counter);
                    }
                    else if(roomType == "s3") {
                        counter = hotel.rooms.stnTPLac.rooms_left;
                        if(counter == null || counter == NaN) {
                            counter = 0;
                        }
                        counter -= no_of_rooms;
                        hotel.rooms.stnTPLac.rooms_left = counter;
                    }
                    else if(roomType == "s3n") {
                        counter = hotel.rooms.stnTPLno.rooms_left;
                        if(counter == null || counter == NaN) {
                            counter = 0;
                        }
                        counter -= no_of_rooms;
                        hotel.rooms.stnTPLno.rooms_left = counter;
                    }
                    else if(roomType == "d1") {
                        counter = hotel.rooms.delSGL.rooms_left;
                        if(counter == null || counter == NaN) {
                            counter = 0;
                        }
                        counter -= no_of_rooms;
                        hotel.rooms.delSGL.rooms_left = counter;
                    }
                    else if(roomType == "d2") {
                        counter = hotel.rooms.delDBL.rooms_left;
                        if(counter == null || counter == NaN) {
                            counter = 0;
                        }
                        counter -= no_of_rooms;
                        hotel.rooms.delDBL.rooms_left = counter;
                    }
                    else if(roomType == "d3") {
                        counter = hotel.rooms.delfam.rooms_left;
                        if(counter == null || counter == NaN) {
                            counter = 0;
                        }
                        counter -= no_of_rooms;
                        hotel.rooms.delfam.rooms_left = counter;
                    }
                    else if(roomType == "p") {
                        counter = hotel.rooms.preSut.rooms_left;
                        if(counter == null || counter == NaN) {
                            counter = 0;
                        }
                        counter -= no_of_rooms;
                        hotel.rooms.preSut.rooms_left = counter;
                    }
                    else if(roomType == "e") {
                        counter = hotel.rooms.execSut.rooms_left;
                        if(counter == null || counter == NaN) {
                            counter = 0;
                        }
                        counter -= no_of_rooms;
                        hotel.rooms.execSut.rooms_left = counter;
                    }
                    else if(roomType == "h") {
                        counter = hotel.rooms.honSut.rooms_left;
                        if(counter == null || counter == NaN) {
                            counter = 0;
                        }
                        counter -= no_of_rooms;
                        hotel.rooms.honSut.rooms_left = counter;
                    }
                    hotel.bookings.push( {bookingDate: new Date() ,
                        endDate : endDate,
                        no_of_rooms : no_of_rooms,
                        roomType : roomType
                    })  ;
                    user.bookings.push( {bookingDate : new Date() ,
                        beginDate : beginDate,
                        endDate : endDate ,
                        name : name ,
                        hotel : hotel.title ,
                        no_of_rooms : no_of_rooms,
                        roomType : roomType
                    });   
                    hotel.save()
                    .then((hotel) => {               
                        user.save()
                        .then( (user) => {
                            res.statusCode=200;
                            //res.json(hotel);
                            res.redirect('/hotels/'+hotel._id);
                        } , (err) => console.log(err))
                        .catch( (err) => console.log(err));
                    },(err) => console.log(err))
                    .catch((err) => console.log(err));
                }                
            } , (err) => console.log(err))
            .catch( (err) => console.log(err));
            
        }
    } , (err) => console.log(err))
    .catch( (err) => console.log(err));
});

function isLoggedIn (req,res,next) {
    if(req.isAuthenticated()) {
        return next();     //continue
    } 
    else
        res.redirect('/'); 
}

module.exports = hotelRouter;
