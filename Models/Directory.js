const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  Config = require("../Config");

const Directory = new Schema(
  {
    directoryName: { type: String, default: "" },
    directoryType: {
      type: String,
      enum: [
        Config.APP_CONSTANTS.DATABASE_CONSTANT.DIRECTORY_TYPE.GOVERNMENT,
        Config.APP_CONSTANTS.DATABASE_CONSTANT.DIRECTORY_TYPE.NGO,
        Config.APP_CONSTANTS.DATABASE_CONSTANT.DIRECTORY_TYPE.SERVICEANDSUPPORT,
      ],
    },
    aboutDirectory: { type: String, default: "" },
    phoneNO: [{ type: Number, default: "" }],
    image: [{ type: String, default: "" }],
    address: { type: String, default: "" },
    website: { type: String, default: "" },
    startTime: { type: String, default: "" },
    endTime: { type: String, default: "" },
    facebookLInk: { type: String, default: "" },
    instagramLInk: { type: String, default: "" },
    twitterLink: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Directory", Directory);
