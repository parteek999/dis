const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Config = require('../Config');


const Directory = new Schema({
    directoryName: { type: String },
    directoryType: { type: String },
    aboutDirectory: { type: String },
    phoneNO: [{ type: Number }],
    image: [{ type: String }],
    address: { type: String },
    website: { type: String },
    startTime: { type: String },
    endTime: { type: String },
    facebookLInk: { type: String },
    instagramLInk: { type: String },
    twitterLink: { type: String },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });



module.exports = mongoose.model('Directory', Directory);