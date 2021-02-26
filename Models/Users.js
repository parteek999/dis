var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Config = require('../Config');

var Users = new Schema({
    countrycode: { type: String },
    email: { type: String, trim: true },
    password: { type: String },
    fullName: { type: String, trim: true },
    profilepic: { type: String ,default:null},
    imgurl:[ {type: String, default: null}],
})

module.exports = mongoose.model('Users', Users);