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
                            fName: Joi.string().allow(''),
                            mName: Joi.string().allow(''),
                            lName: Joi.string().allow(''),
                            sex: Joi.number().valid(1, 2), //...1=male,2=female....//
                            insuranceNumber: Joi.string().allow(''),
                            DOB: Joi.date().iso().allow(''),
                            nationality: Joi.string().allow(''),
                            placeOfBirth: Joi.string().allow(''),
                            maritialStatus: Joi.string().valid("Single", "Married", "Divorced", "Widowed", "Seperated"),
                            address: Joi.string().allow(''),
                            city: Joi.string().allow(''),
                            postalZipCode: Joi.string().allow(''),
                            country: Joi.string().allow(''),
                            homePhone: Joi.string().allow(''),
                            workPhone: Joi.string().allow(''),
                            cellPhone: Joi.string().allow(''),
                            email: Joi.string().email().lowercase().trim().allow(''),
                            prefferedContact: Joi.string().valid("Landline", "Cell", "Email", "SMSText"),

                            EmergencyContact:  Joi.string().allow(''),
                            reloaceteNeed:Joi.string().valid("Yes", "No"),
                            medicalAttention: Joi.string().valid("Yes", "No"),
                            description1: Joi.string().allow(''),
                            serviceAnimal:Joi.string().valid("Yes", "No"),
                            description2: Joi.string().allow(''),
                        }),
                        sectionC:
                            Joi.object().keys({
                            diability:Joi.array().items(Joi.string()).allow(''),
                            detail: Joi.string().allow(''),
                        }),
                        sectionD:
                        Joi.object().keys({
                            Iattended:Joi.array().items(Joi.string()).allow(''),
                            Iattend: Joi.array().items(Joi.string()).allow(''),
                            schoolName: Joi.string().allow(''),
                            highestGrade:Joi.string().allow(''),
                            completedEducation:Joi.string().valid("Completed/Finished School", "Graduated from School", "Never Attended School"), 
                            tertiaryEducation:Joi.string().allow(''),
                        }),
                        sectionE:
                        Joi.object().keys({
                            currentlyEmployed:Joi.string().valid("Yes", "No", "N/A"),
                            occupationDescription:Joi.string().allow(''),
                            seeingEmployement: Joi.string().valid("Yes", "No"),
                            skills:Joi.string().allow(''),
                        }),
                        sectionF:
                        Joi.object().keys({
                            topConcerns:Joi.array().items(Joi.string()).allow(''),
                            additionalConcerns:Joi.string().allow(''),
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
