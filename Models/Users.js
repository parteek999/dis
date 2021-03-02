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
    deviceToken: {type: String,default:null, trim: true},
    deviceType: {
        type: String, enum: [
            Config.APP_CONSTANTS.DATABASE_CONSTANT.DEVICE_TYPES.IOS,
            Config.APP_CONSTANTS.DATABASE_CONSTANT.DEVICE_TYPES.ANDROID
        ]
    },
})

module.exports = mongoose.model('Users', Users);