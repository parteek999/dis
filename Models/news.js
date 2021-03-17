
const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Config = require('../Config');

const news = new Schema({
    admin_id:{type:Schema.ObjectId,ref:"Admin"},
    article:{type:String}
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }

});

module.exports = mongoose.model('news', news);