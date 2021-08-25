const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Config = require('../Config');

const notification = new Schema({ 
    // type: { type: String },
    message: { type: String },
    article_id:{type:String},
    userId:[{type: String, default: ""}],
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

module.exports = mongoose.model('notification', notification);