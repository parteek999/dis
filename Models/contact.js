const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Config = require('../Config');


const contact = new Schema({
    title: { type: String,default:""},
    number: { type: Number ,default:""},
    image: { type: String ,default:""},
    isDeleted: { type: Boolean, default: false, },
    contactType:{type: String ,default:""},
},
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        }

    });

module.exports = mongoose.model('contact', contact);