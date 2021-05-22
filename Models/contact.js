const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Config = require('../Config');


const contact = new Schema({
    title: { type: String },
    number: { type: Number },
    image: { type: String },
    isDeleted: { type: Boolean, default: false, },
},
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        }

    });

module.exports = mongoose.model('contact', contact);