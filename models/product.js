var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    comment : {type : String , required : true},
    author : {type : String}
});

var value = new Object({
    rooms_left : {type : Number},
    fare : {type : String}
});
var roomdivision = new Object({
    stnSGLac : {type: value},
    stnSGLno : {type:value},
    stnDBLac : {type:value},
    stnDBLno : {type:value},
    stnTPLac : {type:value},
    stnTPLno : {type:value},
    delSGL : {type:value},
    delDBL : {type:value},
    delfam : {type:value},
    preSut : {type:value},
    execSut : {type:value},
    honSut : {type:value}
});

var bookingDetails = new Schema({
    bookingDate : {type : Date},
    endDate : {type : Date},
    user : {type : String},
    no_of_rooms : {type : Number},
    roomType : {type : String}
});

var hotelSchema = new Schema({
    imagePath : {type:String, required:true},
    title : {type:String, required:true},
    description : {type:String, required:true},
    price : {type:String, required:true},
    location:{type:String, required:true},
    likers : {type : Array},
    reacts : {type : Number},
    phone : {type : String},
    rooms : {type : roomdivision},
    review : [commentSchema],
    rating : {type: Number,min:1,max:5},
    vacancy : {type : Boolean, default : true},
    bookings : [bookingDetails]
});

module.exports = mongoose.model('Product',hotelSchema);