var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt= require('bcrypt-nodejs');

var bookingDetails = new Schema({
    bookingDate : {type : Date},
    beginDate : {type : Date},
    endDate : {type : Date},
    name : {type : String},
    hotel : {type : String},
    no_of_rooms : {type : Number},
    roomType : {type : String}
});
var userSchema = new Schema({
    email : {type: String ,required : true},
    username : {type :String,required:true },
    password : {type : String },
    bookings : [bookingDetails],
    wishlist : {type : Array},
    admin : {type : Boolean , default : false},
    thumbnail : {type:String , default : ""}
});

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password,bcrypt.genSaltSync(5), null); //hashSync : Synchronous hashing
};

userSchema.methods.validPassword = function(password) { 
    return bcrypt.compareSync(password , this.password);
}

module.exports = mongoose.model('User',userSchema);