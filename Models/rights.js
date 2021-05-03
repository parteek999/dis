const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Config = require('../Config');

const rights = new Schema({
        title:{type:String},
        description:{type:String},
        image:[{type:String}],
    
    isDeleted:{type:Boolean,default: false,},
}, {timestamps: true});





module.exports = mongoose.model('rights', rights);