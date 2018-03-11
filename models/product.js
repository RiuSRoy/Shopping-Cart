var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

var schema = new Schema({
    imagePath : {type:String, required:true},
    title : {type:String, required:true},
    description : {type:String, required:true},
    price : {type:Currency, required:true}
})

module.exports = mongoose.model('Product',schema);