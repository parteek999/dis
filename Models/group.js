var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Config = require('../Config');

var group = new Schema({
    name:{type:String},
    Participants:[{type:Schema.ObjectId,ref:"Users",default:null}],
    members:{type:Number}
})

module.exports = mongoose.model('group', group);