
const mongoose = require('mongoose'),
Schema = mongoose.Schema,
Config = require('../Config');

const  pages = new Schema({
Type: { type: String ,enum: [
    Config.APP_CONSTANTS.DATABASE_CONSTANT.PAGE_TYPE.FAQ,
    Config.APP_CONSTANTS.DATABASE_CONSTANT.PAGE_TYPE.ABOUT,
]},

Content: { type: String }
},
{
timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
}
});


module.exports = mongoose.model("pages", pages);