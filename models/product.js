var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    comment : {type : String , required : true},
    author : {type : String}
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
    rooms : {type : Number},
    review : [commentSchema],
    rating : {type: Number,min:1,max:5}
});

module.exports = mongoose.model('Product',hotelSchema);