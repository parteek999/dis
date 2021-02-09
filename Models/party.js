var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Config = require('../Config');


var party = new Schema({
    location: {
        type: {
          type: String,
          enum: ['Point'],
          default: 'Point',
        },
        cordinates: {
          type: [Number],
          default: [0, 0],
        }
      },

    imageUrl: { type: String },
    name: { type: String, trim: true},
    price: { type: Number },
    venue: { type: String },
    startTime: { type: Date },
    endingTime: { type: Date },
    description: { type: String, trim: true, },
    guestLimit: { type: Number },

    date: { type: Date, default: Date.now },
    request: {
        accepted: [{ type: Schema.ObjectId, ref: "Users", default: null }],
        rejected: [{ type: Schema.ObjectId, ref: "Users", default: null }],
        pending: [{ type: Schema.ObjectId, ref: "Users", default: null }]
    },

    rating: [{
        userid: { type: Schema.ObjectId, ref: "Users", default: null },
        descriptopn: { type: String, trim: true },
        rating: { type: Number },
    }],
    reportEvent: [{
        descriptopn: { type: String, trim: true },
        userid: { type: Schema.ObjectId, ref: "Users", default: null }
    }],
    eventhostType: {
        type: String,
        // enum: [
        //     Config.APP_CONSTANTS.DATABASE_CONSTANT.EVENTHOSTTYPE.INDIVIDUAl,
        //     Config.APP_CONSTANTS.DATABASE_CONSTANT.EVENTHOSTTYPE.ORGANISATION,
        // ]
    },
    category: {
        type: String,
        //  enum: [
        //     Config.APP_CONSTANTS.DATABASE_CONSTANT.CATEGORY.POOL,
        //     Config.APP_CONSTANTS.DATABASE_CONSTANT.CATEGORY.KARAOKE,
        //     Config.APP_CONSTANTS.DATABASE_CONSTANT.CATEGORY.BIRTHDAY,
        //     Config.APP_CONSTANTS.DATABASE_CONSTANT.CATEGORY.MUSIC,
        //     Config.APP_CONSTANTS.DATABASE_CONSTANT.CATEGORY.DRINKING,
        // ]
    },
    
})
party.index({location: '2dsphere'}),

module.exports = mongoose.model('party', party);