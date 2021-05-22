
const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Config = require('../Config');

const news = new Schema({
        title:{type:String},
        description:{type:String},
        image: [{ type: String }],
    isDeleted:{type:Boolean,default: false,},
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

module.exports = mongoose.model('news', news);