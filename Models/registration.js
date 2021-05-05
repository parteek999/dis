var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Config = require('../Config');


//....sectionA= another person information.......//
//....sectionB=personal information..............//
//....sectionC=Disability Information............//
//....sectionD=education information.............//
//....sectionE=information of employment.........//
//....sectionF=Your Concern......................//

const sectionA = 
// new Schema
({
    completingForm: { type: Number, enum: [1, 2] },//...1=yes,2=no....//
    fName: { type: String, trim: true },
    lName: { type: String, trim: true },
    phoneNo: { type: Number },
    email:{ type: String, trim: true },
});
const sectionB = 
// new Schema
({
    fName: { type: String, trim: true },
    mName: { type: String, trim: true },
    lName: { type: String, trim: true },
    sex: { type: Number, enum: [1, 2] },//...1=male,2=female....//
    insuranceNumber: { type: String, trim: true },
    DOB: { type: Date, trim: true },
    nationality: { type: String, trim: true },
    placeOfBirth: { type: String, trim: true },
    maritialStatus: {
        type: String, enum: [
            "Single", "Married", "Divorced", "Widowed", "Seperated"
        ]
    },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalZipCode: { type: String, required: true },
    country: { type: String, required: true },
    homePhone: { type: Number },
    workPhone: { type: Number },
    cellPhone: { type: Number, required: true },
    email: { type: String, required: true },
    prefferedContact: { type: String, enum: ["Landline", "Cell", "Email", "SMSText"] },
    EmergencyContact: { type: String },
    reloaceteNeed: { type: String, enum: ["Yes", "No"] },
    medicalAttention: { type: String, enum: ["Yes", "No"] },
    description1: { type: String },
    serviceAnimal: { type: String },
    description2: { type: String },
});

const sectionC = 
// new Schema
({
    diability: [{ type: String }],
    detail: { type: String },
});
const sectionD = 
// new Schema
({
    Iattended: [{ type: String }],
    Iattend: [{ type: String }],
    schoolName: { type: String },
    highestGrade: { type: Number },
    completedEducation: { type: String, enum: ["Comleted/Finished School", "Graduated from School", "Never Attended School"] },
    tertiaryEducation: [{ type: String }]
});

const sectionE = 
// new Schema
({
    currentlyEmployed: { type: String, enum: ["Yes", "No", "N/A"] },
    occupationDescription: { type: String },
    seeingEmployement: { type: String, enum: ["Yes", "No"] },
    jobPreference: { type: String },
    skills: { type: String },
});
const sectionF = 
// new Schema
({
topConcerns:[{type: String}],
additionalConcerns:{type: String}

});


var registration = new Schema({

    sectionA: sectionA,
    sectionB: sectionB,
    sectionC: sectionC,
    sectionD: sectionD,
    sectionE: sectionE,
    sectionF: sectionF,
    isDeleted:{type:Boolean,default: false},
    isVerified:{type:Boolean,default: false},
},{ timestamps: true, }

);
module.exports = mongoose.model('registration', registration);

