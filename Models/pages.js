
const mongoose = require('mongoose'),
Schema = mongoose.Schema,
Config = require('../Config');

const  pages = new Schema({
Type: { type: String ,enum: [
    Config.APP_CONSTANTS.DATABASE_CONSTANT.PAGE_TYPE.FAQ,
    Config.APP_CONSTANTS.DATABASE_CONSTANT.PAGE_TYPE.ABOUT,
    Config.APP_CONSTANTS.DATABASE_CONSTANT.PAGE_TYPE.YOUR_RIGHTS,
    Config.APP_CONSTANTS.DATABASE_CONSTANT.PAGE_TYPE.DISABILITYACT,
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