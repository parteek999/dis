var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Config = require('../Config');

var Users = new Schema({
    isBlocked: { type: Boolean, default: false, required: true },
    isVerified: { type: Boolean, default: false, required: true },
    countryCode: { type: String },
    email: { type: String, trim: true },
    password: { type: String },
    phoneNo: { type: String },
    fullNo:{type:String,default:""},
    // accessToken:{type:String,default:""},
    name: { type: String, trim: true },
    profilePic: { type: String, default: "" },
    deviceToken: { type: String, default: "", trim: true },
    deviceType: {
        type: String, enum: [
            Config.APP_CONSTANTS.DATABASE_CONSTANT.DEVICE_TYPES.IOS,
            Config.APP_CONSTANTS.DATABASE_CONSTANT.DEVICE_TYPES.ANDROID
        ]
    },
}, {timestamps: true,}

);

module.exports = mongoose.model('Users', Users);








