const Controller = require('../Controller');
const UniversalFunctions = require('../Utils/UniversalFunctions');
const Joi = require('@hapi/joi');
const Config = require('../Config');
const SUCCESS = Config.responseMessages.SUCCESS;
const ERROR = Config.responseMessages.ERROR;
const winston = require('winston');

module.exports = [

    {
        method: 'POST',
        path: '/Registration/register',
        config: {
            description: 'register',
            auth: false,
            tags: ['api'],
            handler: (request, reply) => {
                return Controller.registeration.register(request.payload, request.auth.credentials)
                    .then(response => {
                        return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
                    })
                    .catch(error => {
                        winston.error("=====error=============", error);
                        return UniversalFunctions.sendError("en", error, reply);
                    });
            },
            validate: {
                payload: Joi.object({
                    sectionA:
                        Joi.object().keys({
                            completingForm: Joi.number().valid(1, 2),  //...1=yes,2=no....//                                
                            fName: Joi.string(),
                            lName: Joi.string(),
                            phoneNo: Joi.string(),
                            email: Joi.string().email().lowercase().trim(),
                        }),

                    sectionB:                      
                        Joi.object().keys({
                            fName: Joi.string(),
                            mName: Joi.string(),
                            lName: Joi.string(),
                            sex: Joi.number().valid(1, 2), //...1=male,2=female....//
                            insuranceNumber: Joi.string(),
                            DOB: Joi.date().iso(),
                            nationality: Joi.string(),
                            placeOfBirth: Joi.string(),
                            maritialStatus: Joi.string().valid("Single", "Married", "Divorced", "Widowed", "Seperated"),
                            address: Joi.string(),
                            city: Joi.string(),
                            postalZipCode: Joi.string(),
                            country: Joi.string(),
                            homePhone: Joi.string(),
                            workPhone: Joi.string(),
                            cellPhone: Joi.string(),
                            email: Joi.string().email().lowercase().trim(),
                            prefferedContact: Joi.string().valid("Landline", "Cell", "Email", "SMSText"),

                            EmergencyContact:  Joi.string(),
                            reloaceteNeed:Joi.string().valid("Yes", "No"),
                            medicalAttention: Joi.string().valid("Yes", "No"),
                            description1: Joi.string(),
                            serviceAnimal:Joi.string().valid("Yes", "No"),
                            description2: Joi.string(),
                        }),
                        sectionC:
                            Joi.object().keys({
                            diability:Joi.array().items(Joi.string()),
                            detail: Joi.string(),
                        }),
                        sectionD:
                        Joi.object().keys({
                            Iattended:Joi.array().items(Joi.string()),
                            Iattend: Joi.array().items(Joi.string()),
                            schoolName: Joi.string(),
                            highestGrade:Joi.string(),
                            completedEducation:Joi.string().valid("Completed/Finished School", "Graduated from School", "Never Attended School"), 
                            tertiaryEducation:Joi.string(),
                        }),
                        sectionE:
                        Joi.object().keys({
                            currentlyEmployed:Joi.string().valid("Yes", "No", "N/A"),
                            occupationDescription:Joi.string(),
                            seeingEmployement: Joi.string().valid("Yes", "No"),
                            skills:Joi.string(),
                        }),
                        sectionF:
                        Joi.object().keys({
                            topConcerns:Joi.array().items(Joi.string()),
                            additionalConcerns:Joi.string(),
                        })
                }),
                failAction: UniversalFunctions.failActionFunction
            },
            plugins: {
                'hapi-swagger': {
                    //   payloadType: 'form'
                }
            }
        }
    },

    {
        method: 'GET',
        path: '/Registration/getRegistration',
        config: {
            description: "getRegistration",
            auth: {
                strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]
            },
            tags: ['api',"Registration"],
            handler: (request, reply) => {
                return Controller.registeration.getRegistration(request.query,request.auth.credentials)
                    .then(response => {
                        return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
                    })
                    .catch(error => {
                        winston.error("=====error=============", error);
                        return UniversalFunctions.sendError("en", error, reply);
                    });
            },
            validate: {
                query: Joi.object({
                }),
                headers: UniversalFunctions.authorizationHeaderObj,
                failAction: UniversalFunctions.failActionFunction },
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form',
                }
            }
        }
    },

    {
        method: 'GET',
        path: '/Registration/singleRegistration',
        config: {
            description: "singleRegistration",
            auth: {
                strategies:[Config.APP_CONSTANTS.SCOPE.ADMIN]
            },
            tags: ['api'],

            handler: (request, reply) => {
                return Controller.registeration.singleRegistration(request.query,request.auth.credentials)
                    
                    .then(response => {
                        return UniversalFunctions.sendSuccess("en", SUCCESS.DEFAULT, response, reply);
                    })
                    .catch(error => {
                        winston.error("=====error=============", error);
                        return UniversalFunctions.sendError("en", error, reply);
                    });
            },
            validate: {
                query: Joi.object({
                    id:Joi.string(),
                }),
                headers: UniversalFunctions.authorizationHeaderObj,
                failAction: UniversalFunctions.failActionFunction },
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form',
                }
            }
        }
    },
];
